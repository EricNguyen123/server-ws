import { forwardRef, Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsEntity } from 'src/entities/order-items.entity';
import { CartItemsModule } from '../cart-items/cart-items.module';
import { UserModule } from '../user/user.module';
import { ProductTypesModule } from '../product-types/product-types.module';
import { ProductsModule } from '../products/products.module';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { StoresModule } from '../stores/stores.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItemsEntity]),
    CartItemsModule,
    UserModule,
    ProductTypesModule,
    ProductsModule,
    CampaignsModule,
    StoresModule,
    forwardRef(() => OrdersModule),
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports: [TypeOrmModule.forFeature([OrderItemsEntity]), OrderItemsService],
})
export class OrderItemsModule {}
