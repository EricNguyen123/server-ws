import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductTypesEntity } from './product-types.entity';
import { ProductResourceEntity } from './product-resources.entity';

@Entity('product_type_resources')
export class ProductTypeResourcesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { unsigned: true })
  quantity: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(
    () => ProductTypesEntity,
    (productType) => productType.productTypeResources,
    {
      onDelete: 'CASCADE',
    },
  )
  productType: ProductTypesEntity;

  @ManyToOne(
    () => ProductResourceEntity,
    (productResource) => productResource.productTypeResources,
    {
      onDelete: 'CASCADE',
    },
  )
  productResource: ProductResourceEntity;
}
