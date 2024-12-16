import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillsEntity } from 'src/entities/bills.entity';
import { OrdersModule } from '../orders/orders.module';
import { PrefecturesModule } from '../prefectures/prefectures.module';
import { StorePrefecturesModule } from '../store-prefectures/store-prefectures.module';
import { CampaignProductsModule } from '../campaign-products/campaign-products.module';
import { BillGroupsModule } from '../bill-groups/bill-groups.module';
import { BillItemsModule } from '../bill-items/bill-items.module';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([BillsEntity]),
    OrdersModule,
    PrefecturesModule,
    StorePrefecturesModule,
    CampaignProductsModule,
    BillGroupsModule,
    BillItemsModule,
    AuthModule,
  ],
  controllers: [BillsController],
  providers: [BillsService, JwtAuthGuard],
  exports: [TypeOrmModule.forFeature([BillsEntity]), BillsService],
})
export class BillsModule {}
