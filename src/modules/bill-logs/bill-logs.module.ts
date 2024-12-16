import { Module } from '@nestjs/common';
import { BillLogsService } from './bill-logs.service';
import { BillLogsController } from './bill-logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillLogsEntity } from 'src/entities/bill-logs.entity';
import { BillsModule } from '../bills/bills.module';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BillLogsEntity]),
    BillsModule,
    AuthModule,
  ],
  controllers: [BillLogsController],
  providers: [BillLogsService, JwtAuthGuard],
  exports: [TypeOrmModule.forFeature([BillLogsEntity]), BillLogsService],
})
export class BillLogsModule {}
