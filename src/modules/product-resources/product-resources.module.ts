import { forwardRef, Module } from '@nestjs/common';
import { ProductResourcesService } from './product-resources.service';
import { ProductResourcesController } from './product-resources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductResourceEntity } from 'src/entities/product-resources.entity';
import { ProductsService } from '../products/products.service';
import { ProductsModule } from '../products/products.module';
import { StoresModule } from '../stores/stores.module';
import { StoresService } from '../stores/stores.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductResourceEntity]),
    forwardRef(() => StoresModule),
    forwardRef(() => ProductsModule),
  ],
  controllers: [ProductResourcesController],
  providers: [ProductResourcesService, StoresService, ProductsService],
  exports: [
    TypeOrmModule.forFeature([ProductResourceEntity]),
    ProductResourcesService,
  ],
})
export class ProductResourcesModule {}
