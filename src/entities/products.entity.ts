import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MediaItemsEntity } from './media_items.entity';
import { CategoryTinyEntity } from './category-tinies.entity';
import { DiscountSettingsEntity } from './discount-settings.entity';
import { ProductResourceEntity } from './product-resources.entity';
import { CampaignProductsEntity } from './campaign-products.entity';
import { CartItemsEntity } from './cart-items.entity';
import { ProductTypesEntity } from './product-types.entity';
import { FavoritesEntity } from './favorites.entity';

@Entity('products')
export class ProductsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  code: string;

  @Column('int')
  price: number;

  @Column('int', { unsigned: true })
  quantity: number;

  @Column('int', { unsigned: true })
  quantity_alert: number;

  @Column('int')
  order_unit: number;

  @Column('text')
  description: string;

  @Column('int')
  status: number;

  @Column('int')
  multiplication_rate: number;

  @Column('float')
  discount: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => MediaItemsEntity, (mediaItem) => mediaItem.product)
  mediaItems: MediaItemsEntity[];

  @OneToMany(
    () => CategoryTinyEntity,
    (categoryTinies) => categoryTinies.product,
    {
      cascade: true,
    },
  )
  categoryTinies: CategoryTinyEntity[];

  @OneToMany(
    () => DiscountSettingsEntity,
    (discountSettings) => discountSettings.product,
    {
      cascade: true,
    },
  )
  discountSettings: DiscountSettingsEntity[];

  @OneToMany(
    () => ProductResourceEntity,
    (productResources) => productResources.product,
    {
      cascade: true,
    },
  )
  productResources: ProductResourceEntity[];

  @OneToMany(
    () => CampaignProductsEntity,
    (campaignProducts) => campaignProducts.product,
    {
      cascade: true,
    },
  )
  campaignProducts: CampaignProductsEntity[];

  @OneToMany(() => CartItemsEntity, (cartItems) => cartItems.product, {
    cascade: true,
  })
  cartItems: CartItemsEntity[];

  @OneToMany(() => ProductTypesEntity, (productTypes) => productTypes.product, {
    cascade: true,
  })
  productTypes: ProductTypesEntity[];

  @OneToMany(() => FavoritesEntity, (favorites) => favorites.product, {
    cascade: true,
  })
  favorites: FavoritesEntity[];
}
