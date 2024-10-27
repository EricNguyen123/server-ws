import { Module } from '@nestjs/common';
import { BillGroupsService } from './bill-groups.service';
import { BillGroupsController } from './bill-groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillGroupsEntity } from 'src/entities/bill-groups.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillGroupsEntity])],
  controllers: [BillGroupsController],
  providers: [BillGroupsService],
  exports: [TypeOrmModule.forFeature([BillGroupsEntity]), BillGroupsService],
})
export class BillGroupsModule {}
