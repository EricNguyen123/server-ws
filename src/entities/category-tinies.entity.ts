import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoriesEntity } from './categories.entity';
import { ProductsEntity } from './products.entity';

@Entity('category_tinies')
export class CategoryTinyEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CategoriesEntity, (category) => category.categoryTinies, {
    onDelete: 'CASCADE',
  })
  category: CategoriesEntity;

  @ManyToOne(() => ProductsEntity, (product) => product.categoryTinies, {
    onDelete: 'CASCADE',
  })
  product: ProductsEntity;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
