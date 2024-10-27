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
import { BillsEntity } from './bills.entity';
import { UserEntity } from './user.entity';
import { OrderItemsEntity } from './order-items.entity';
import { OrderStatus } from 'src/common/enums/order-status.enum';
import { ShippingStatus } from 'src/common/enums/shipping-status.enum';

@Entity('orders')
export class OrdersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  orderer_type: string;

  @Column('varchar')
  receiver_type: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.NotActive })
  order_status: OrderStatus;

  @Column({
    type: 'enum',
    enum: ShippingStatus,
    default: ShippingStatus.WaitingForPickUp,
  })
  shipping_status: ShippingStatus;

  @Column({ type: 'varchar', length: 255 })
  order_id: string;

  @Column()
  order_date: Date;

  @Column()
  order_at: Date;

  @Column('text')
  memo: string;

  @Column()
  order_type: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => BillsEntity, (bill) => bill.orders, {
    onDelete: 'CASCADE',
  })
  bill: BillsEntity;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @ManyToOne(() => UserEntity, (orderer) => orderer.ordersOrderer, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderer_id' })
  orderer: UserEntity;

  @ManyToOne(() => UserEntity, (receiver) => receiver.ordersReceiver)
  @JoinColumn({ name: 'receiver_id' })
  receiver: UserEntity;

  @OneToMany(() => OrderItemsEntity, (orderItems) => orderItems.order, {
    cascade: true,
  })
  orderItems: OrderItemsEntity[];
}
