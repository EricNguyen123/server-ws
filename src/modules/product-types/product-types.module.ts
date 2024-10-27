import { Module } from '@nestjs/common';
import { ProductTypesService } from './product-types.service';
import { ProductTypesController } from './product-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypesEntity } from 'src/entities/product-types.entity';
import { SizeTypesModule } from '../size-types/size-types.module';
import { ColorTypesModule } from '../color-types/color-types.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductTypesEntity]),
    SizeTypesModule,
    ColorTypesModule,
    ProductsModule,
  ],
  controllers: [ProductTypesController],
  providers: [ProductTypesService],
  exports: [
    TypeOrmModule.forFeature([ProductTypesEntity]),
    ProductTypesService,
  ],
})
export class ProductTypesModule {}
