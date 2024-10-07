import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ActiveStorageAttachmentsEntity } from './active-storage-attachments.entity';

@Entity('active_storage_blobs')
export class ActiveStorageBlobsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  key: string;

  @Column()
  filename: string;

  @Column()
  content_type: string;

  @Column('text')
  metadata: string;

  @Column('int')
  byte_size: number;

  @Column()
  checksum: string;

  @OneToMany(
    () => ActiveStorageAttachmentsEntity,
    (activeStorageAttachment) => activeStorageAttachment.activeStorageBlob,
  )
  activeStorageAttachments: ActiveStorageAttachmentsEntity[];
}
