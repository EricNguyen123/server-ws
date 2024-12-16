import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/entities/products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CategoryTiniesModule } from '../category-tinies/category-tinies.module';
import { CategoriesModule } from '../categories/categories.module';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity]),
    forwardRef(() => CategoryTiniesModule),
    forwardRef(() => CategoriesModule),
    AuthModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, JwtAuthGuard],
  exports: [TypeOrmModule.forFeature([ProductsEntity]), ProductsService],
})
export class ProductsModule {}
