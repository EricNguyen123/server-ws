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
import { SizeTypes } from 'src/common/enums/size-types.enum';

@Entity('size_types')
export class SizeTypesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  size_code: string;

  @Column({
    type: 'enum',
    enum: SizeTypes,
    default: SizeTypes.Male,
  })
  size_type: SizeTypes;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(
    () => ProductTypesEntity,
    (productTypes) => productTypes.sizeType,
    {
      cascade: true,
    },
  )
  productTypes: ProductTypesEntity[];
}
