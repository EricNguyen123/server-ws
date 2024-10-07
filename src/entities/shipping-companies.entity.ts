import { IsEmail, IsUrl } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shipping_companies')
export class ShippingCompaniesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  @IsEmail()
  email: string;

  @Column({ default: null, nullable: true, length: 255 })
  name: string;

  @Column({ default: null, nullable: true, length: 12 })
  phone: string;

  @Column()
  @IsUrl()
  url: string;

  @Column({ type: 'text', default: null, nullable: true })
  memo: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
