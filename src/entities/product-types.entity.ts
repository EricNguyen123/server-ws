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
import { ProductsEntity } from './products.entity';
import { ColorTypesEntity } from './color-types.entity';
import { SizeTypesEntity } from './size-types.entity';
import { ProductTypeResourcesEntity } from './product-type-resources.entity';
import { CartItemsEntity } from './cart-items.entity';
import { BillItemsEntity } from './bill-items.entity';

@Entity('product_types')
export class ProductTypesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { unsigned: true })
  quantity: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => ProductsEntity, (product) => product.productTypes, {
    onDelete: 'CASCADE',
  })
  product: ProductsEntity;

  @ManyToOne(() => ColorTypesEntity, (colorType) => colorType.productTypes, {
    onDelete: 'CASCADE',
  })
  colorType: ColorTypesEntity;

  @ManyToOne(() => SizeTypesEntity, (sizeType) => sizeType.productTypes, {
    onDelete: 'CASCADE',
  })
  sizeType: SizeTypesEntity;

  @OneToMany(() => CartItemsEntity, (cartItems) => cartItems.productType, {
    cascade: true,
  })
  cartItems: CartItemsEntity[];

  @OneToMany(
    () => ProductTypeResourcesEntity,
    (productTypeResources) => productTypeResources.productType,
    {
      cascade: true,
    },
  )
  productTypeResources: ProductTypeResourcesEntity[];

  @OneToMany(() => BillItemsEntity, (billItems) => billItems.productType, {
    cascade: true,
  })
  billItems: BillItemsEntity[];
}
