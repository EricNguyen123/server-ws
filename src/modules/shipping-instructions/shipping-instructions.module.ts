import { Module } from '@nestjs/common';
import { ShippingInstructionsService } from './shipping-instructions.service';
import { ShippingInstructionsController } from './shipping-instructions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingInstructionsEntity } from 'src/entities/shipping-instructions.entity';
import { OrderItemsModule } from '../order-items/order-items.module';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShippingInstructionsEntity]),
    OrderItemsModule,
    AuthModule,
  ],
  controllers: [ShippingInstructionsController],
  providers: [ShippingInstructionsService, JwtAuthGuard],
  exports: [
    TypeOrmModule.forFeature([ShippingInstructionsEntity]),
    ShippingInstructionsService,
  ],
})
export class ShippingInstructionsModule {}
