import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity } from 'src/entities/favorites.entity';
import { ProductsModule } from '../products/products.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity]),
    ProductsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, JwtAuthGuard],
  exports: [TypeOrmModule.forFeature([FavoritesEntity]), FavoritesService],
})
export class FavoritesModule {}
