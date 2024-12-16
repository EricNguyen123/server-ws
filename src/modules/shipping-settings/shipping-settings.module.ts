import { Module } from '@nestjs/common';
import { ShippingSettingsService } from './shipping-settings.service';
import { ShippingSettingsController } from './shipping-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingSettingsEntity } from 'src/entities/shipping-settings.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingSettingsEntity]), AuthModule],
  controllers: [ShippingSettingsController],
  providers: [ShippingSettingsService, JwtAuthGuard],
  exports: [
    TypeOrmModule.forFeature([ShippingSettingsEntity]),
    ShippingSettingsService,
  ],
})
export class ShippingSettingsModule {}
