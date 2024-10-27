import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BillGroupsEntity } from './bill-groups.entity';
import { ProductTypesEntity } from './product-types.entity';

@Entity('bill_items')
export class BillItemsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  quantity: number;

  @Column('int')
  price: number;

  @Column({ type: 'varchar', length: 255 })
  order_id: string;

  @Column()
  order_at: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => BillGroupsEntity, (billGroup) => billGroup.billItems, {
    onDelete: 'CASCADE',
  })
  billGroup: BillGroupsEntity;

  @ManyToOne(() => ProductTypesEntity, (productType) => productType.billItems, {
    onDelete: 'CASCADE',
  })
  productType: ProductTypesEntity;
}
