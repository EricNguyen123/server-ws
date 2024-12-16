import { Module } from '@nestjs/common';
import { PrefecturesService } from './prefectures.service';
import { PrefecturesController } from './prefectures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrefecturesEntity } from 'src/entities/prefectures.entity';
import { ShippingSettingsModule } from '../shipping-settings/shipping-settings.module';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrefecturesEntity]),
    ShippingSettingsModule,
    AuthModule,
  ],
  controllers: [PrefecturesController],
  providers: [PrefecturesService, JwtAuthGuard],
  exports: [TypeOrmModule.forFeature([PrefecturesEntity]), PrefecturesService],
})
export class PrefecturesModule {}
