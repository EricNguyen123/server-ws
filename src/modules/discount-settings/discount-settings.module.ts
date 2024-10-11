import { Module } from '@nestjs/common';
import { DiscountSettingsService } from './discount-settings.service';
import { DiscountSettingsController } from './discount-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountSettingsEntity } from 'src/entities/discount-settings.entity';
import { ProductsService } from '../products/products.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountSettingsEntity]), ProductsModule],
  controllers: [DiscountSettingsController],
  providers: [DiscountSettingsService, ProductsService],
  exports: [
    TypeOrmModule.forFeature([DiscountSettingsEntity]),
    DiscountSettingsService,
  ],
})
export class DiscountSettingsModule {}
