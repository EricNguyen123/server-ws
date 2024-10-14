import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PrefecturesEntity } from './prefectures.entity';

@Entity('shipping_settings')
export class ShippingSettingsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  free_ship_amount: number;

  @Column({ type: 'int' })
  free_ship_number: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(
    () => PrefecturesEntity,
    (prefectures) => prefectures.shippingSetting,
    {
      cascade: true,
    },
  )
  prefectures: PrefecturesEntity[];
}
