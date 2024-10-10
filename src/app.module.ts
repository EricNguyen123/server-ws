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
    DatabaseModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
