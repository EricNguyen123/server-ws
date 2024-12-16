import { forwardRef, Module } from '@nestjs/common';
import { ProductResourcesService } from './product-resources.service';
import { ProductResourcesController } from './product-resources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductResourceEntity } from 'src/entities/product-resources.entity';
import { ProductsService } from '../products/products.service';
import { ProductsModule } from '../products/products.module';
import { StoresModule } from '../stores/stores.module';
import { StoresService } from '../stores/stores.service';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductResourceEntity]),
    forwardRef(() => StoresModule),
    forwardRef(() => ProductsModule),
    AuthModule,
  ],
  controllers: [ProductResourcesController],
  providers: [
    ProductResourcesService,
    StoresService,
    ProductsService,
    JwtAuthGuard,
  ],
  exports: [
    TypeOrmModule.forFeature([ProductResourceEntity]),
    ProductResourcesService,
  ],
})
export class ProductResourcesModule {}
