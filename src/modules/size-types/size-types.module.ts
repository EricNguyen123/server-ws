import { Module } from '@nestjs/common';
import { SizeTypesService } from './size-types.service';
import { SizeTypesController } from './size-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeTypesEntity } from 'src/entities/size-types.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([SizeTypesEntity]), AuthModule],
  controllers: [SizeTypesController],
  providers: [SizeTypesService, JwtAuthGuard],
  exports: [TypeOrmModule.forFeature([SizeTypesEntity]), SizeTypesService],
})
export class SizeTypesModule {}
