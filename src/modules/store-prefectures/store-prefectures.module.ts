import { Module } from '@nestjs/common';
import { StorePrefecturesService } from './store-prefectures.service';
import { StorePrefecturesController } from './store-prefectures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorePrefecturesEntity } from 'src/entities/store-prefectures.entity';
import { PrefecturesModule } from '../prefectures/prefectures.module';
import { PrefecturesService } from '../prefectures/prefectures.service';
import { StoresService } from '../stores/stores.service';
import { StoresModule } from '../stores/stores.module';
import { ShippingSettingsModule } from '../shipping-settings/shipping-settings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StorePrefecturesEntity]),
    PrefecturesModule,
    StoresModule,
    ShippingSettingsModule,
  ],
  controllers: [StorePrefecturesController],
  providers: [StorePrefecturesService, PrefecturesService, StoresService],
  exports: [
    TypeOrmModule.forFeature([StorePrefecturesEntity]),
    StorePrefecturesService,
  ],
})
export class StorePrefecturesModule {}
