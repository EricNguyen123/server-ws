import { IsUrl } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MediaItemsEntity } from './media_items.entity';

@Entity('banners')
export class BannersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  descriptions: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column('int')
  number_order: number;

  @Column()
  @IsUrl()
  url: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => MediaItemsEntity, (mediaItem) => mediaItem.banner)
  mediaItems: MediaItemsEntity[];
}
