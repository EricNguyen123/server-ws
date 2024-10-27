import { Module } from '@nestjs/common';
import { CampaignProductsService } from './campaign-products.service';
import { CampaignProductsController } from './campaign-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignProductsEntity } from 'src/entities/campaign-products.entity';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CampaignProductsEntity]),
    CampaignsModule,
    ProductsModule,
  ],
  controllers: [CampaignProductsController],
  providers: [CampaignProductsService],
  exports: [
    TypeOrmModule.forFeature([CampaignProductsEntity]),
    CampaignProductsService,
  ],
})
export class CampaignProductsModule {}
