import { Module } from '@nestjs/common';
import { ColorTypesService } from './color-types.service';
import { ColorTypesController } from './color-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorTypesEntity } from 'src/entities/color-types.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ColorTypesEntity]), AuthModule],
  controllers: [ColorTypesController],
  providers: [ColorTypesService, JwtAuthGuard],
  exports: [TypeOrmModule.forFeature([ColorTypesEntity]), ColorTypesService],
})
export class ColorTypesModule {}
