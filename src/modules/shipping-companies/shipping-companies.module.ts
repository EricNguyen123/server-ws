import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingCompaniesEntity } from 'src/entities/shipping-companies.entity';
import { ShippingCompaniesService } from './shipping-companies.service';
import { ShippingCompaniesController } from './shipping-companies.controller';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingCompaniesEntity]), AuthModule],
  controllers: [ShippingCompaniesController],
  providers: [ShippingCompaniesService, JwtAuthGuard],
  exports: [
    TypeOrmModule.forFeature([ShippingCompaniesEntity]),
    ShippingCompaniesService,
  ],
})
export class ShippingCompaniesModule {}
