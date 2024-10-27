import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsEntity } from 'src/entities/campaigns.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CampaignsEntity])],
  controllers: [CampaignsController],
  providers: [CampaignsService],
  exports: [TypeOrmModule.forFeature([CampaignsEntity]), CampaignsService],
})
export class CampaignsModule {}
