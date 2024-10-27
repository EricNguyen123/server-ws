import { Module } from '@nestjs/common';
import { ShippingNoticesService } from './shipping-notices.service';
import { ShippingNoticesController } from './shipping-notices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingNoticesEntity } from 'src/entities/shipping-notices.entity';
import { ShippingCompaniesModule } from '../shipping-companies/shipping-companies.module';
import { OrderItemsModule } from '../order-items/order-items.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShippingNoticesEntity]),
    ShippingCompaniesModule,
    OrderItemsModule,
  ],
  controllers: [ShippingNoticesController],
  providers: [ShippingNoticesService],
  exports: [
    TypeOrmModule.forFeature([ShippingNoticesEntity]),
    ShippingNoticesService,
  ],
})
export class ShippingNoticesModule {}
