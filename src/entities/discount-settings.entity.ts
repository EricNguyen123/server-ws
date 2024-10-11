import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductsEntity } from './products.entity';

@Entity('discount_settings')
export class DiscountSettingsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  custom_discount_value: number;

  @ManyToOne(() => ProductsEntity, (product) => product.discountSettings, {
    onDelete: 'CASCADE',
  })
  product: ProductsEntity;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
