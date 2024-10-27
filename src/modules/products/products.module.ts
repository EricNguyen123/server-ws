import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/entities/products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CategoryTiniesModule } from '../category-tinies/category-tinies.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity]),
    forwardRef(() => CategoryTiniesModule),
    forwardRef(() => CategoriesModule),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [TypeOrmModule.forFeature([ProductsEntity]), ProductsService],
})
export class ProductsModule {}
