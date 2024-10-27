import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CampaignsEntity } from './campaigns.entity';
import { ProductsEntity } from './products.entity';

@Entity('campaign_products')
export class CampaignProductsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  discount_value: number;

  @Column('int')
  product_type: number;

  @ManyToOne(() => CampaignsEntity, (campaign) => campaign.campaignProducts, {
    onDelete: 'CASCADE',
  })
  campaign: CampaignsEntity;

  @ManyToOne(() => ProductsEntity, (product) => product.campaignProducts, {
    onDelete: 'CASCADE',
  })
  product: ProductsEntity;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
