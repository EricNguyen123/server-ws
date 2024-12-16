import { Module } from '@nestjs/common';
import { ShippingMakerManagersService } from './shipping-maker-managers.service';
import { ShippingMakerManagersController } from './shipping-maker-managers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingMakerManagersEntity } from 'src/entities/shipping-maker-managers.entity';
import { ShippingInstructionsModule } from '../shipping-instructions/shipping-instructions.module';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShippingMakerManagersEntity]),
    ShippingInstructionsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [ShippingMakerManagersController],
  providers: [ShippingMakerManagersService, JwtAuthGuard],
  exports: [
    TypeOrmModule.forFeature([ShippingMakerManagersEntity]),
    ShippingMakerManagersService,
  ],
})
export class ShippingMakerManagersModule {}
