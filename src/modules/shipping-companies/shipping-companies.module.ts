import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingCompaniesEntity } from 'src/entities/shipping-companies.entity';
import { ShippingCompaniesService } from './shipping-companies.service';
import { ShippingCompaniesController } from './shipping-companies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingCompaniesEntity])],
  controllers: [ShippingCompaniesController],
  providers: [ShippingCompaniesService],
  exports: [
    TypeOrmModule.forFeature([ShippingCompaniesEntity]),
    ShippingCompaniesService,
  ],
})
export class ShippingCompaniesModule {}
