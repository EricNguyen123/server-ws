import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemsEntity } from 'src/entities/cart-items.entity';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { ProductsModule } from '../products/products.module';
import { StoresModule } from '../stores/stores.module';
import { ProductTypesModule } from '../product-types/product-types.module';
import { SizeTypesModule } from '../size-types/size-types.module';
import { ColorTypesModule } from '../color-types/color-types.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItemsEntity]),
    CampaignsModule,
    ProductsModule,
    StoresModule,
    ProductTypesModule,
    SizeTypesModule,
    ColorTypesModule,
    UserModule,
  ],
  controllers: [CartItemsController],
  providers: [CartItemsService],
  exports: [TypeOrmModule.forFeature([CartItemsEntity]), CartItemsService],
})
export class CartItemsModule {}
