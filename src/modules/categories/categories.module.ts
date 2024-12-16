import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from 'src/entities/categories.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesEntity]), AuthModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, JwtAuthGuard],
  exports: [TypeOrmModule.forFeature([CategoriesEntity]), CategoriesService],
})
export class CategoriesModule {}
