import { Module } from '@nestjs/common';
import { BillLogsService } from './bill-logs.service';
import { BillLogsController } from './bill-logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillLogsEntity } from 'src/entities/bill-logs.entity';
import { BillsModule } from '../bills/bills.module';

@Module({
  imports: [TypeOrmModule.forFeature([BillLogsEntity]), BillsModule],
  controllers: [BillLogsController],
  providers: [BillLogsService],
  exports: [TypeOrmModule.forFeature([BillLogsEntity]), BillLogsService],
})
export class BillLogsModule {}
