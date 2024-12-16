import { forwardRef, Module } from '@nestjs/common';
import { CategoryTiniesService } from './category-tinies.service';
import { CategoryTiniesController } from './category-tinies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryTinyEntity } from 'src/entities/category-tinies.entity';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryTinyEntity]),
    forwardRef(() => CategoriesModule),
    forwardRef(() => ProductsModule),
    AuthModule,
  ],
  controllers: [CategoryTiniesController],
  providers: [CategoryTiniesService, JwtAuthGuard],
  exports: [
    TypeOrmModule.forFeature([CategoryTinyEntity]),
    CategoryTiniesService,
  ],
})
export class CategoryTiniesModule {}
