import { Module } from '@nestjs/common';
import { ActiveStorageService } from './active-storage.service';
import { ActiveStorageController } from './active-storage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveStorageBlobsEntity } from 'src/entities/active-storage-blobs.entity';
import { ActiveStorageAttachmentsEntity } from 'src/entities/active-storage-attachments.entity';
import { ProductsEntity } from 'src/entities/products.entity';
import { MediaItemsEntity } from 'src/entities/media_items.entity';
import { BannersEntity } from 'src/entities/banners.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActiveStorageBlobsEntity,
      ActiveStorageAttachmentsEntity,
      MediaItemsEntity,
      ProductsEntity,
      BannersEntity,
    ]),
  ],
  controllers: [ActiveStorageController],
  providers: [ActiveStorageService],
  exports: [
    TypeOrmModule.forFeature([
      ActiveStorageBlobsEntity,
      ActiveStorageAttachmentsEntity,
      MediaItemsEntity,
      ProductsEntity,
      BannersEntity,
    ]),
    ActiveStorageService,
  ],
})
export class ActiveStorageModule {}
