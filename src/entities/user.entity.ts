import { IsEmail } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ default: 0 })
  role: number;

  @Column({ default: null })
  name: string;

  @Column({ default: null, nullable: true })
  zipcode: string;

  @Column({ default: null, nullable: true })
  phone: string;

  @Column({ default: null, nullable: true })
  prefecture: string;

  @Column({ default: null, nullable: true })
  city: string;

  @Column({ default: null, nullable: true })
  street: string;

  @Column({ default: null, nullable: true })
  building: string;

  @Column()
  encrypted_password: string;

  @Column({ default: 0 })
  status: number;

  @Column({ default: null, nullable: true })
  current_sign_in_at: Date;

  @Column({ default: null, nullable: true })
  last_sign_in_at: Date;

  @Column({ default: null, nullable: true })
  tokens: string;

  @Column({ default: null, nullable: true })
  provider: string;

  @Column({ default: null, nullable: true })
  uid: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
