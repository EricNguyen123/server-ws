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
import { OrderItemsEntity } from './order-items.entity';
import { IsEmail } from 'class-validator';
import { ShippingMakerManagersEntity } from './shipping-maker-managers.entity';

@Entity('shipping_instructions')
export class ShippingInstructionsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  shipping_department: number;

  @Column('int')
  shipping_source: number;

  @Column()
  @IsEmail()
  email: string;

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
    () => OrderItemsEntity,
    (orderItem) => orderItem.shippingInstructions,
    {
      onDelete: 'CASCADE',
    },
  )
  orderItem: OrderItemsEntity;

  @OneToMany(
    () => ShippingMakerManagersEntity,
    (shippingMakerManagers) => shippingMakerManagers.shippingInstruction,
    {
      cascade: true,
    },
  )
  shippingMakerManagers: ShippingMakerManagersEntity[];
}
