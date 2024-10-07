import { IsEmail } from 'class-validator';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({
    type: 'enum',
    enum: ValidRoles,
    default: ValidRoles.User,
  })
  role: ValidRoles;

  @Column({ default: null, nullable: true, length: 255 })
  name: string;

  @Column({ default: null, nullable: true, length: 8 })
  zipcode: string;

  @Column({ default: null, nullable: true, length: 12 })
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

  @Column({ type: 'int', default: 0 })
  status: number;

  @Column({ default: null, nullable: true })
  current_sign_in_at: Date;

  @Column({ default: null, nullable: true })
  last_sign_in_at: Date;

  @Column({ type: 'text', default: null, nullable: true })
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
