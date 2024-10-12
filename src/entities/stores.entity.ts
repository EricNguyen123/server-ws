import { IsEmail } from 'class-validator';
import { Status } from 'src/common/enums/status.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stores')
export class StoreEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ default: null, nullable: true, length: 255 })
  name: string;

  @Column({ length: 8 })
  postcode: string;

  @Column({ default: null, nullable: true })
  prefecture: string;

  @Column({ default: null, nullable: true })
  city: string;

  @Column({ default: null, nullable: true })
  street: string;

  @Column({ default: null, nullable: true })
  building: string;

  @Column({ type: 'enum', enum: Status, default: Status.NotActive })
  status: Status;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
