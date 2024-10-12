import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as path from 'path';
import { ActiveStorageAttachmentsEntity } from 'src/entities/active-storage-attachments.entity';
import { ActiveStorageBlobsEntity } from 'src/entities/active-storage-blobs.entity';
import { MediaItemsEntity } from 'src/entities/media_items.entity';
import { ProductsEntity } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { KeyTypes } from 'src/common/enums/key-types.enum';
import * as fs from 'fs';
import { BannersEntity } from 'src/entities/banners.entity';
import { envs } from 'src/config/envs';

@Injectable()
export class ActiveStorageService {
  constructor(
    @InjectRepository(ActiveStorageBlobsEntity)
    private activeStorageBlobsRepository: Repository<ActiveStorageBlobsEntity>,
    @InjectRepository(ActiveStorageAttachmentsEntity)
    private activeStorageAttachmentsRepository: Repository<ActiveStorageAttachmentsEntity>,
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
    @InjectRepository(MediaItemsEntity)
    private readonly mediaItemsRepository: Repository<MediaItemsEntity>,
    @InjectRepository(BannersEntity)
    private readonly bannersRepository: Repository<BannersEntity>,
  ) {}

  async uploadFile(file: Express.Multer.File, id: string, key: string) {
    const useKey = this.isValidKeyType(key);
    if (!useKey) {
      throw new Error('Key not found');
    }

    let item;
    if (useKey === KeyTypes.Product) {
      item = await this.productsRepository.findOne({
        where: { id: id },
      });
    } else if (useKey === KeyTypes.Banner) {
      item = await this.bannersRepository.findOne({
        where: { id: id },
      });
    }

    if (!item) {
      throw new Error('Item not found');
    }

    const filePath = path.join('./uploads', file.filename);
    const fileBuffer = fs.readFileSync(filePath);
    const checksum = crypto.createHash('md5').update(fileBuffer).digest('hex');

    const blob = new ActiveStorageBlobsEntity();
    blob.key = file.filename;
    blob.filename = file.originalname;
    blob.content_type = file.mimetype;
    blob.byte_size = file.size;
    blob.checksum = checksum;
    blob.metadata = '{}';
    await this.activeStorageBlobsRepository.save(blob);

    const mediaItem = new MediaItemsEntity();
    mediaItem.resource_type = key;
    mediaItem.media_type = 1;
    mediaItem.media_url = path.join('/uploads', file.filename);

    if (useKey === KeyTypes.Product) {
      mediaItem.product = item;
    } else if (useKey === KeyTypes.Banner) {
      mediaItem.banner = item;
    }

    await this.mediaItemsRepository.save(mediaItem);

    const attachment = new ActiveStorageAttachmentsEntity();
    attachment.name = key;
    attachment.record_type = key;
    attachment.activeStorageBlob = blob;
    attachment.mediaItem = mediaItem;
    await this.activeStorageAttachmentsRepository.save(attachment);

    return {
      message: 'File uploaded successfully',
      blob,
      mediaItem,
    };
  }

  async deleteFile(blobId: string): Promise<void> {
    const blob = await this.activeStorageBlobsRepository.findOne({
      where: { id: blobId },
    });

    if (!blob) {
      throw new NotFoundException('File not found');
    }

    const filePath = path.join('./uploads', blob.key);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    const attachments = await this.activeStorageAttachmentsRepository.find({
      where: { activeStorageBlob: { id: blobId } },
      relations: ['activeStorageBlob', 'mediaItem'],
    });

    await this.activeStorageAttachmentsRepository.delete({
      activeStorageBlob: blob,
    });
    const mediaItemIds = attachments
      .filter((attachment) => attachment.mediaItem)
      .map((attachment) => attachment.mediaItem.id);

    if (mediaItemIds.length > 0) {
      await this.mediaItemsRepository.delete(mediaItemIds);
    }
    await this.activeStorageBlobsRepository.delete({ id: blobId });
  }

  getUploadedFileUrl(filename: string): string {
    return `${envs.appUrl}/${filename}`;
  }

  isValidKeyType(key: string) {
    const useKey = key.toLowerCase();
    if (Object.values(KeyTypes).includes(useKey as KeyTypes)) {
      return useKey;
    }
    return false;
  }
}
