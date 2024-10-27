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
import { OrdersEntity } from './orders.entity';
import { CartItemsEntity } from './cart-items.entity';
import { ShippingNoticesEntity } from './shipping-notices.entity';
import { ShippingInstructionsEntity } from './shipping-instructions.entity';

@Entity('order_items')
export class OrderItemsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  price: number;

  @Column('int')
  status: number;

  @Column()
  shipping_date: Date;

  @Column('int')
  order_type: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => OrdersEntity, (order) => order.orderItems, {
    onDelete: 'CASCADE',
  })
  order: OrdersEntity;

  @ManyToOne(() => CartItemsEntity, (cartItem) => cartItem.orderItems, {
    onDelete: 'CASCADE',
  })
  cartItem: CartItemsEntity;

  @OneToMany(
    () => ShippingNoticesEntity,
    (shippingNotices) => shippingNotices.orderItem,
    {
      cascade: true,
    },
  )
  shippingNotices: ShippingNoticesEntity[];

  @OneToMany(
    () => ShippingInstructionsEntity,
    (shippingInstructions) => shippingInstructions.orderItem,
    {
      cascade: true,
    },
  )
  shippingInstructions: ShippingInstructionsEntity[];
}
