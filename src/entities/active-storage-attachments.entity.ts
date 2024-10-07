import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ActiveStorageBlobsEntity } from './active-storage-blobs.entity';
import { MediaItemsEntity } from './media_items.entity';

@Entity('active_storage_attachments')
export class ActiveStorageAttachmentsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  name: string;

  @Column()
  record_type: string;

  @ManyToOne(
    () => ActiveStorageBlobsEntity,
    (activeStorageBlob) => activeStorageBlob.activeStorageAttachments,
  )
  activeStorageBlob: ActiveStorageBlobsEntity;

  @ManyToOne(
    () => MediaItemsEntity,
    (mediaItem) => mediaItem.activeStorageAttachments,
  )
  mediaItem: MediaItemsEntity;
}
