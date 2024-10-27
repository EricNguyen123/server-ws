import { Module } from '@nestjs/common';
import { SizeTypesService } from './size-types.service';
import { SizeTypesController } from './size-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeTypesEntity } from 'src/entities/size-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SizeTypesEntity])],
  controllers: [SizeTypesController],
  providers: [SizeTypesService],
  exports: [TypeOrmModule.forFeature([SizeTypesEntity]), SizeTypesService],
})
export class SizeTypesModule {}
