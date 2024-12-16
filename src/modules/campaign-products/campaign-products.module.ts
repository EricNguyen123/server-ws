import { Module } from '@nestjs/common';
import { CampaignProductsService } from './campaign-products.service';
import { CampaignProductsController } from './campaign-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignProductsEntity } from 'src/entities/campaign-products.entity';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { ProductsModule } from '../products/products.module';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CampaignProductsEntity]),
    CampaignsModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [CampaignProductsController],
  providers: [CampaignProductsService, JwtAuthGuard],
  exports: [
    TypeOrmModule.forFeature([CampaignProductsEntity]),
    CampaignProductsService,
  ],
})
export class CampaignProductsModule {}
