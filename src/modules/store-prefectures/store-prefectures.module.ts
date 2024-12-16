import { Module } from '@nestjs/common';
import { StorePrefecturesService } from './store-prefectures.service';
import { StorePrefecturesController } from './store-prefectures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorePrefecturesEntity } from 'src/entities/store-prefectures.entity';
import { PrefecturesModule } from '../prefectures/prefectures.module';
import { StoresModule } from '../stores/stores.module';
import { ShippingSettingsModule } from '../shipping-settings/shipping-settings.module';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StorePrefecturesEntity]),
    PrefecturesModule,
    StoresModule,
    ShippingSettingsModule,
    AuthModule,
  ],
  controllers: [StorePrefecturesController],
  providers: [StorePrefecturesService, JwtAuthGuard],
  exports: [
    TypeOrmModule.forFeature([StorePrefecturesEntity]),
    StorePrefecturesService,
  ],
})
export class StorePrefecturesModule {}
