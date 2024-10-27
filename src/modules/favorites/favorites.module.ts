import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity } from 'src/entities/favorites.entity';
import { ProductsModule } from '../products/products.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity]),
    ProductsModule,
    UserModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [TypeOrmModule.forFeature([FavoritesEntity]), FavoritesService],
})
export class FavoritesModule {}
