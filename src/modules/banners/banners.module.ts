import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannersService } from './banners.service';
import { BannersEntity } from 'src/entities/banners.entity';
import { BannersController } from './banners.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BannersEntity])],
  controllers: [BannersController],
  providers: [BannersService],
  exports: [TypeOrmModule.forFeature([BannersEntity]), BannersService],
})
export class BannersModule {}
