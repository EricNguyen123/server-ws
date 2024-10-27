import { forwardRef, Module } from '@nestjs/common';
import { CategoryTiniesService } from './category-tinies.service';
import { CategoryTiniesController } from './category-tinies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryTinyEntity } from 'src/entities/category-tinies.entity';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryTinyEntity]),
    forwardRef(() => CategoriesModule),
    forwardRef(() => ProductsModule),
  ],
  controllers: [CategoryTiniesController],
  providers: [CategoryTiniesService],
  exports: [
    TypeOrmModule.forFeature([CategoryTinyEntity]),
    CategoryTiniesService,
  ],
})
export class CategoryTiniesModule {}
