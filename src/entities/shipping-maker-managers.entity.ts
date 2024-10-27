import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ShippingInstructionsEntity } from './shipping-instructions.entity';

@Entity('shipping_maker_managers')
export class ShippingMakerManagersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.shippingMakerManagers, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(
    () => ShippingInstructionsEntity,
    (shippingInstruction) => shippingInstruction.shippingMakerManagers,
    {
      onDelete: 'CASCADE',
    },
  )
  shippingInstruction: ShippingInstructionsEntity;
}
