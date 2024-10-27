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
import { ProductsEntity } from './products.entity';
import { StoreEntity } from './stores.entity';
import { ProductTypeResourcesEntity } from './product-type-resources.entity';

@Entity('product_resources')
export class ProductResourceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProductsEntity, (product) => product.productResources, {
    onDelete: 'CASCADE',
  })
  product: ProductsEntity;

  @ManyToOne(() => StoreEntity, (store) => store.productResources, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resource_id' })
  store: StoreEntity;

  @Column()
  resource_type: string;

  @Column('int', { unsigned: true })
  quantity: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(
    () => ProductTypeResourcesEntity,
    (productTypeResources) => productTypeResources.productResource,
    {
      cascade: true,
    },
  )
  productTypeResources: ProductTypeResourcesEntity[];
}
