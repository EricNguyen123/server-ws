import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannersService } from './banners.service';
import { BannersEntity } from 'src/entities/banners.entity';
import { BannersController } from './banners.controller';
import { ActiveStorageModule } from '../active-storage/active-storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([BannersEntity]), ActiveStorageModule],
  controllers: [BannersController],
  providers: [BannersService],
  exports: [TypeOrmModule.forFeature([BannersEntity]), BannersService],
})
export class BannersModule {}
