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

@Entity('categories')
export class CategoriesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @ManyToOne(() => CategoriesEntity, (category) => category.subCategories, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parentCategory: CategoriesEntity;

  @OneToMany(() => CategoriesEntity, (category) => category.parentCategory, {
    cascade: true,
  })
  subCategories: CategoriesEntity[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
