import { Module } from '@nestjs/common';
import { ShippingNoticesService } from './shipping-notices.service';
import { ShippingNoticesController } from './shipping-notices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingNoticesEntity } from 'src/entities/shipping-notices.entity';
import { ShippingCompaniesModule } from '../shipping-companies/shipping-companies.module';
import { OrderItemsModule } from '../order-items/order-items.module';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShippingNoticesEntity]),
    ShippingCompaniesModule,
    OrderItemsModule,
    AuthModule,
  ],
  controllers: [ShippingNoticesController],
  providers: [ShippingNoticesService, JwtAuthGuard],
  exports: [
    TypeOrmModule.forFeature([ShippingNoticesEntity]),
    ShippingNoticesService,
  ],
})
export class ShippingNoticesModule {}
