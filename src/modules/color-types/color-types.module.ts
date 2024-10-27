import { Module } from '@nestjs/common';
import { ColorTypesService } from './color-types.service';
import { ColorTypesController } from './color-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorTypesEntity } from 'src/entities/color-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColorTypesEntity])],
  controllers: [ColorTypesController],
  providers: [ColorTypesService],
  exports: [TypeOrmModule.forFeature([ColorTypesEntity]), ColorTypesService],
})
export class ColorTypesModule {}
