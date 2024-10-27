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
import { BillsEntity } from './bills.entity';
import { StoreEntity } from './stores.entity';
import { BillItemsEntity } from './bill-items.entity';

@Entity('bill_groups')
export class BillGroupsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column('int')
  order_type: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => BillsEntity, (bill) => bill.billGroups, {
    onDelete: 'CASCADE',
  })
  bill: BillsEntity;

  @ManyToOne(() => StoreEntity, (store) => store.billGroups, {
    onDelete: 'CASCADE',
  })
  store: StoreEntity;

  @OneToMany(() => BillItemsEntity, (billItems) => billItems.billGroup, {
    cascade: true,
  })
  billItems: BillItemsEntity[];
}
