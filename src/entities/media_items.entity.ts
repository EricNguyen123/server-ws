import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ActiveStorageAttachmentsEntity } from './active-storage-attachments.entity';
import { ProductsEntity } from './products.entity';

@Entity('media_items')
export class MediaItemsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ length: 255 })
  resource_type: string;

  @Column('int')
  media_type: number;

  @Column('text')
  media_url: string;

  @OneToMany(
    () => ActiveStorageAttachmentsEntity,
    (activeStorageAttachment) => activeStorageAttachment.mediaItem,
  )
  activeStorageAttachments: ActiveStorageAttachmentsEntity[];

  @ManyToOne(() => ProductsEntity, (product) => product.mediaItems, {
    nullable: true,
  })
  @JoinColumn({ name: 'resource_id' })
  product: ProductsEntity;
}
