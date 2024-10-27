import { Module } from '@nestjs/common';
import { ShippingInstructionsService } from './shipping-instructions.service';
import { ShippingInstructionsController } from './shipping-instructions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingInstructionsEntity } from 'src/entities/shipping-instructions.entity';
import { OrderItemsModule } from '../order-items/order-items.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShippingInstructionsEntity]),
    OrderItemsModule,
  ],
  controllers: [ShippingInstructionsController],
  providers: [ShippingInstructionsService],
  exports: [
    TypeOrmModule.forFeature([ShippingInstructionsEntity]),
    ShippingInstructionsService,
  ],
})
export class ShippingInstructionsModule {}
