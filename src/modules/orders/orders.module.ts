import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from 'src/entities/orders.entity';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { OrderItemsModule } from '../order-items/order-items.module';
import { CartItemsModule } from '../cart-items/cart-items.module';
import { ShippingNoticesModule } from '../shipping-notices/shipping-notices.module';
import { ShippingInstructionsModule } from '../shipping-instructions/shipping-instructions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersEntity]),
    UserModule,
    forwardRef(() => OrderItemsModule),
    CartItemsModule,
    ShippingNoticesModule,
    ShippingInstructionsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, UserService],
  exports: [TypeOrmModule.forFeature([OrdersEntity]), OrdersService],
})
export class OrdersModule {}
