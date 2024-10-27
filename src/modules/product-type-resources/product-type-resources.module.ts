import { Module } from '@nestjs/common';
import { ProductTypeResourcesService } from './product-type-resources.service';
import { ProductTypeResourcesController } from './product-type-resources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeResourcesEntity } from 'src/entities/product-type-resources.entity';
import { ProductResourcesModule } from '../product-resources/product-resources.module';
import { ProductTypesModule } from '../product-types/product-types.module';
import { ProductsModule } from '../products/products.module';
import { StoresModule } from '../stores/stores.module';
import { SizeTypesModule } from '../size-types/size-types.module';
import { ColorTypesModule } from '../color-types/color-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductTypeResourcesEntity]),
    ProductResourcesModule,
    ProductTypesModule,
    ProductsModule,
    StoresModule,
    SizeTypesModule,
    ColorTypesModule,
  ],
  controllers: [ProductTypeResourcesController],
  providers: [ProductTypeResourcesService],
  exports: [
    TypeOrmModule.forFeature([ProductTypeResourcesEntity]),
    ProductTypeResourcesService,
  ],
})
export class ProductTypeResourcesModule {}
