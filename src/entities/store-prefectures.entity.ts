import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PrefecturesEntity } from './prefectures.entity';
import { StoreEntity } from './stores.entity';

@Entity('store_prefectures')
export class StorePrefecturesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  shipping_fee: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(
    () => PrefecturesEntity,
    (prefecture) => prefecture.storePrefectures,
    { onDelete: 'CASCADE' },
  )
  prefecture: PrefecturesEntity;

  @ManyToOne(() => StoreEntity, (store) => store.storePrefectures, {
    onDelete: 'CASCADE',
  })
  store: StoreEntity;
}
