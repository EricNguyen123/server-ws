import { Injectable } from '@nestjs/common';
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

  getUploadedFileUrl(filename: string): string {
    return `/uploads/${filename}`;
  }

  isValidKeyType(key: string) {
    const useKey = key.toLowerCase();
    if (Object.values(KeyTypes).includes(useKey as KeyTypes)) {
      return useKey;
    }
    return false;
  }
}
