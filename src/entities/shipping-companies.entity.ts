import { IsEmail, IsUrl } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShippingNoticesEntity } from './shipping-notices.entity';

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

  @OneToMany(
    () => ShippingNoticesEntity,
    (shippingNotices) => shippingNotices.shippingCompany,
    {
      cascade: true,
    },
  )
  shippingNotices: ShippingNoticesEntity[];
}
