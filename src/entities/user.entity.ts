import { IsEmail } from 'class-validator';
import { Status } from 'src/common/enums/status.enum';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItemsEntity } from './cart-items.entity';
import { OrdersEntity } from './orders.entity';
import { ShippingMakerManagersEntity } from './shipping-maker-managers.entity';
import { FavoritesEntity } from './favorites.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({
    type: 'varchar',
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

  @Column({ type: 'varchar', default: Status.NotActive })
  status: Status;

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

  @OneToMany(() => CartItemsEntity, (cartItems) => cartItems.user, {
    cascade: true,
  })
  cartItems: CartItemsEntity[];

  @OneToMany(() => OrdersEntity, (orders) => orders.user)
  orders: OrdersEntity[];

  @OneToMany(() => OrdersEntity, (ordersOrderer) => ordersOrderer.orderer, {
    cascade: true,
  })
  ordersOrderer: OrdersEntity[];

  @OneToMany(() => OrdersEntity, (ordersReceiver) => ordersReceiver.receiver)
  ordersReceiver: OrdersEntity[];

  @OneToMany(
    () => ShippingMakerManagersEntity,
    (shippingMakerManagers) => shippingMakerManagers.user,
    {
      cascade: true,
    },
  )
  shippingMakerManagers: ShippingMakerManagersEntity[];

  @OneToMany(() => FavoritesEntity, (favorites) => favorites.user, {
    cascade: true,
  })
  favorites: FavoritesEntity[];
}
