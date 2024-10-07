import { Module } from '@nestjs/common';
import { ActiveStorageService } from './active-storage.service';
import { ActiveStorageController } from './active-storage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveStorageBlobsEntity } from 'src/entities/active-storage-blobs.entity';
import { ActiveStorageAttachmentsEntity } from 'src/entities/active-storage-attachments.entity';
import { ProductsEntity } from 'src/entities/products.entity';
import { MediaItemsEntity } from 'src/entities/media_items.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActiveStorageBlobsEntity,
      ActiveStorageAttachmentsEntity,
      MediaItemsEntity,
      ProductsEntity,
    ]),
  ],
  controllers: [ActiveStorageController],
  providers: [ActiveStorageService],
})
export class ActiveStorageModule {}
