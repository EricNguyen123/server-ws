import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsEntity } from 'src/entities/campaigns.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([CampaignsEntity]), AuthModule],
  controllers: [CampaignsController],
  providers: [CampaignsService, JwtAuthGuard],
  exports: [TypeOrmModule.forFeature([CampaignsEntity]), CampaignsService],
})
export class CampaignsModule {}
