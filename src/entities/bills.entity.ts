import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BillLogsEntity } from './bill-logs.entity';
import { BillGroupsEntity } from './bill-groups.entity';
import { OrdersEntity } from './orders.entity';

@Entity('bills')
export class BillsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: number;

  @Column()
  export_at: Date;

  @Column({ type: 'varchar', length: 255 })
  bill_id: string;

  @Column('int')
  reduced_taxable_amount: number;

  @Column('int')
  reduced_tax: number;

  @Column('int')
  taxable_amount: number;

  @Column('int')
  tax: number;

  @Column('int')
  shipping_fee: number;

  @Column('int')
  amount: number;

  @Column('int')
  discount: number;

  @Column('int')
  total_amount: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => BillLogsEntity, (billLogs) => billLogs.bill, {
    cascade: true,
  })
  billLogs: BillLogsEntity[];

  @OneToMany(() => BillGroupsEntity, (billGroups) => billGroups.bill, {
    cascade: true,
  })
  billGroups: BillGroupsEntity[];

  @OneToMany(() => OrdersEntity, (orders) => orders.bill, {
    cascade: true,
  })
  orders: OrdersEntity[];
}
