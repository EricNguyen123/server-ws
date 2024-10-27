import { Module } from '@nestjs/common';
import { BillItemsService } from './bill-items.service';
import { BillItemsController } from './bill-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillItemsEntity } from 'src/entities/bill-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillItemsEntity])],
  controllers: [BillItemsController],
  providers: [BillItemsService],
  exports: [TypeOrmModule.forFeature([BillItemsEntity]), BillItemsService],
})
export class BillItemsModule {}
