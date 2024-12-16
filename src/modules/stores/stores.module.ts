import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from 'src/entities/stores.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity]), AuthModule],
  controllers: [StoresController],
  providers: [StoresService, JwtAuthGuard],
  exports: [TypeOrmModule.forFeature([StoreEntity]), StoresService],
})
export class StoresModule {}
