import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CampaignProductsEntity } from './campaign-products.entity';
import { CartItemsEntity } from './cart-items.entity';

@Entity('campaigns')
export class CampaignsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column('int')
  campaign_type: number;

  @Column('int')
  bought_count: number;

  @Column('int')
  promotion_count: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(
    () => CampaignProductsEntity,
    (campaignProducts) => campaignProducts.campaign,
    {
      cascade: true,
    },
  )
  campaignProducts: CampaignProductsEntity[];

  @OneToMany(() => CartItemsEntity, (cartItems) => cartItems.campaign, {
    cascade: true,
  })
  cartItems: CartItemsEntity[];
}
