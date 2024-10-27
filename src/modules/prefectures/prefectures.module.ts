import { Module } from '@nestjs/common';
import { PrefecturesService } from './prefectures.service';
import { PrefecturesController } from './prefectures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrefecturesEntity } from 'src/entities/prefectures.entity';
import { ShippingSettingsModule } from '../shipping-settings/shipping-settings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrefecturesEntity]),
    ShippingSettingsModule,
  ],
  controllers: [PrefecturesController],
  providers: [PrefecturesService],
  exports: [TypeOrmModule.forFeature([PrefecturesEntity]), PrefecturesService],
})
export class PrefecturesModule {}
