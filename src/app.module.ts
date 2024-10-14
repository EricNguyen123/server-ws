import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseConfigModule } from './config/databases/db.module';
import { DatabaseModule } from './databases/database.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ShippingCompaniesModule } from './modules/shipping-companies/shipping-companies.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BannersModule } from './modules/banners/banners.module';
import { ProductsModule } from './modules/products/products.module';
import { ActiveStorageModule } from './modules/active-storage/active-storage.module';
import { redisConfig } from './config/redis/redis.config';
import { MailerModule } from './modules/mailer/mailer.module';
import { CategoryTiniesModule } from './modules/category-tinies/category-tinies.module';
import { DiscountSettingsModule } from './modules/discount-settings/discount-settings.module';
import { StoresModule } from './modules/stores/stores.module';
import { ProductResourcesModule } from './modules/product-resources/product-resources.module';
import { ShippingSettingsModule } from './modules/shipping-settings/shipping-settings.module';
import { PrefecturesModule } from './modules/prefectures/prefectures.module';
import { StorePrefecturesModule } from './modules/store-prefectures/store-prefectures.module';

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: `redis://${redisConfig.host}:${redisConfig.port}`,
    }),
    DatabaseConfigModule,
    AuthModule,
    UserModule,
    ShippingCompaniesModule,
    CategoriesModule,
    BannersModule,
    ProductsModule,
    ActiveStorageModule,
    CategoryTiniesModule,
    DiscountSettingsModule,
    StoresModule,
    DatabaseModule,
    MailerModule,
    ProductResourcesModule,
    ShippingSettingsModule,
    PrefecturesModule,
    StorePrefecturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
