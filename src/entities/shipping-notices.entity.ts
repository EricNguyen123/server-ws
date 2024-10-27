import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShippingCompaniesEntity } from './shipping-companies.entity';
import { OrderItemsEntity } from './order-items.entity';

@Entity('shipping_notices')
export class ShippingNoticesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  document_number: string;

  @Column({ type: 'text' })
  subject: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  memo: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(
    () => ShippingCompaniesEntity,
    (shippingCompany) => shippingCompany.shippingNotices,
    {
      onDelete: 'CASCADE',
    },
  )
  shippingCompany: ShippingCompaniesEntity;

  @ManyToOne(() => OrderItemsEntity, (orderItem) => orderItem.shippingNotices, {
    onDelete: 'CASCADE',
  })
  orderItem: OrderItemsEntity;
}
