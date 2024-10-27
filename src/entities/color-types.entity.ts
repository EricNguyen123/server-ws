import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductTypesEntity } from './product-types.entity';

@Entity('color_types')
export class ColorTypesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  color_code: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(
    () => ProductTypesEntity,
    (productTypes) => productTypes.colorType,
    {
      cascade: true,
    },
  )
  productTypes: ProductTypesEntity[];
}
