import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShippingSettingsEntity } from './shipping-settings.entity';
import { StorePrefecturesEntity } from './store-prefectures.entity';

@Entity('prefectures')
export class PrefecturesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  postcode: string;

  @Column('int')
  shipping_fee: number;

  @Column('int')
  kind: number;

  @Column({ type: 'varchar', length: 255 })
  label: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(
    () => ShippingSettingsEntity,
    (shippingSetting) => shippingSetting.prefectures,
    { onDelete: 'CASCADE' },
  )
  shippingSetting: ShippingSettingsEntity;

  @OneToMany(
    () => StorePrefecturesEntity,
    (storePrefectures) => storePrefectures.prefecture,
    {
      cascade: true,
    },
  )
  storePrefectures: StorePrefecturesEntity[];
}
