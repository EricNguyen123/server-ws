import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannersService } from './banners.service';
import { BannersEntity } from 'src/entities/banners.entity';
import { BannersController } from './banners.controller';
import { ActiveStorageModule } from '../active-storage/active-storage.module';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([BannersEntity]),
    ActiveStorageModule,
    AuthModule,
  ],
  controllers: [BannersController],
  providers: [BannersService, JwtAuthGuard],
  exports: [TypeOrmModule.forFeature([BannersEntity]), BannersService],
})
export class BannersModule {}
