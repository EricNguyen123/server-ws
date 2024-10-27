import { Module } from '@nestjs/common';
import { ShippingMakerManagersService } from './shipping-maker-managers.service';
import { ShippingMakerManagersController } from './shipping-maker-managers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingMakerManagersEntity } from 'src/entities/shipping-maker-managers.entity';
import { ShippingInstructionsModule } from '../shipping-instructions/shipping-instructions.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShippingMakerManagersEntity]),
    ShippingInstructionsModule,
    UserModule,
  ],
  controllers: [ShippingMakerManagersController],
  providers: [ShippingMakerManagersService],
  exports: [
    TypeOrmModule.forFeature([ShippingMakerManagersEntity]),
    ShippingMakerManagersService,
  ],
})
export class ShippingMakerManagersModule {}
