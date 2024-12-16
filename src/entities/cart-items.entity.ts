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
import { CampaignsEntity } from './campaigns.entity';
import { ProductsEntity } from './products.entity';
import { StoreEntity } from './stores.entity';
import { ProductTypesEntity } from './product-types.entity';
import { CartStatus } from 'src/common/enums/cart-status.enum';
import { UserEntity } from './user.entity';
import { OrderItemsEntity } from './order-items.entity';

@Entity('cart_items')
export class CartItemsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { unsigned: true })
  quantity: number;

  @Column({
    type: 'varchar',
    default: CartStatus.AddCart,
  })
  status: CartStatus;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => CampaignsEntity, (campaign) => campaign.cartItems, {
    onDelete: 'CASCADE',
  })
  campaign: CampaignsEntity;

  @ManyToOne(() => ProductsEntity, (product) => product.cartItems, {
    onDelete: 'CASCADE',
  })
  product: ProductsEntity;

  @ManyToOne(() => StoreEntity, (store) => store.cartItems, {
    onDelete: 'CASCADE',
  })
  store: StoreEntity;

  @ManyToOne(() => ProductTypesEntity, (productType) => productType.cartItems, {
    onDelete: 'CASCADE',
  })
  productType: ProductTypesEntity;

  @ManyToOne(() => UserEntity, (user) => user.cartItems, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @OneToMany(() => OrderItemsEntity, (orderItems) => orderItems.cartItem, {
    cascade: true,
  })
  orderItems: OrderItemsEntity[];
}
