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
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { CampaignProductsModule } from './modules/campaign-products/campaign-products.module';
import { CartItemsModule } from './modules/cart-items/cart-items.module';
import { ColorTypesModule } from './modules/color-types/color-types.module';
import { SizeTypesModule } from './modules/size-types/size-types.module';
import { ProductTypesModule } from './modules/product-types/product-types.module';
import { ProductTypeResourcesModule } from './modules/product-type-resources/product-type-resources.module';
import { BillsModule } from './modules/bills/bills.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderItemsModule } from './modules/order-items/order-items.module';
import { BillLogsModule } from './modules/bill-logs/bill-logs.module';
import { BillGroupsModule } from './modules/bill-groups/bill-groups.module';
import { BillItemsModule } from './modules/bill-items/bill-items.module';
import { ShippingNoticesModule } from './modules/shipping-notices/shipping-notices.module';
import { ShippingInstructionsModule } from './modules/shipping-instructions/shipping-instructions.module';
import { ShippingMakerManagersModule } from './modules/shipping-maker-managers/shipping-maker-managers.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

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
    CampaignsModule,
    CampaignProductsModule,
    CartItemsModule,
    ColorTypesModule,
    SizeTypesModule,
    ProductTypesModule,
    ProductTypeResourcesModule,
    BillsModule,
    OrdersModule,
    OrderItemsModule,
    BillLogsModule,
    BillGroupsModule,
    BillItemsModule,
    ShippingNoticesModule,
    ShippingInstructionsModule,
    ShippingMakerManagersModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
