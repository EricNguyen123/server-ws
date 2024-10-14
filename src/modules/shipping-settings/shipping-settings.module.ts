import { Module } from '@nestjs/common';
import { ShippingSettingsService } from './shipping-settings.service';
import { ShippingSettingsController } from './shipping-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingSettingsEntity } from 'src/entities/shipping-settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingSettingsEntity])],
  controllers: [ShippingSettingsController],
  providers: [ShippingSettingsService],
  exports: [
    TypeOrmModule.forFeature([ShippingSettingsEntity]),
    ShippingSettingsService,
  ],
})
export class ShippingSettingsModule {}
