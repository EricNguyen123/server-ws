import { Module } from '@nestjs/common';
import { ProductTypesService } from './product-types.service';
import { ProductTypesController } from './product-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypesEntity } from 'src/entities/product-types.entity';
import { SizeTypesModule } from '../size-types/size-types.module';
import { ColorTypesModule } from '../color-types/color-types.module';
import { ProductsModule } from '../products/products.module';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductTypesEntity]),
    SizeTypesModule,
    ColorTypesModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [ProductTypesController],
  providers: [ProductTypesService, JwtAuthGuard],
  exports: [
    TypeOrmModule.forFeature([ProductTypesEntity]),
    ProductTypesService,
  ],
})
export class ProductTypesModule {}
