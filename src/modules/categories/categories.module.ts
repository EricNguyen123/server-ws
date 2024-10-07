import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from 'src/entities/categories.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesEntity])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [TypeOrmModule.forFeature([CategoriesEntity]), CategoriesService],
})
export class CategoriesModule {}
