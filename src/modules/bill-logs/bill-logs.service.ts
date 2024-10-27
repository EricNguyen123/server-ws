import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillLogsDto } from 'src/dto/bill-logs.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';
import { BillLogsEntity } from 'src/entities/bill-logs.entity';
import { Repository } from 'typeorm';
import { BillsService } from '../bills/bills.service';

@Injectable()
export class BillLogsService {
  constructor(
    private readonly billsService: BillsService,
    @InjectRepository(BillLogsEntity)
    private readonly billLogsRepository: Repository<BillLogsEntity>,
  ) {}

  async createItem(billLogsDto: BillLogsDto): Promise<BillLogsEntity> {
    const bill = await this.billsService.findOneById(billLogsDto.bill_id);
    if (!bill) {
      throw new NotFoundException('Bill not found');
    }
    const billLogs = new BillLogsEntity();
    Object.assign(billLogs, { content: billLogsDto.content, bill: bill });
    return this.billLogsRepository.save(billLogsDto);
  }

  async updateItem(
    id: string,
    billLogsDto: BillLogsDto,
  ): Promise<BillLogsEntity> {
    const log = await this.billLogsRepository.findOneOrFail({
      where: { id: id },
    });
    log.content = billLogsDto.content;
    return await this.billLogsRepository.save(log);
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const result = await this.billLogsRepository.delete({ id: id });
    if (result.affected === 0) {
      throw new NotFoundException('Bill log not found');
    }
    return {
      status: 200,
      message: 'Bill log deleted successfully',
    };
  }

  async findAll(): Promise<BillLogsEntity[]> {
    return await this.billLogsRepository.find();
  }

  async findOneById(id: string): Promise<BillLogsEntity> {
    const log = await this.billLogsRepository.findOneOrFail({
      where: { id: id },
    });
    return log;
  }

  async findByBillId(billId: string): Promise<BillLogsEntity[]> {
    return await this.billLogsRepository.find({
      where: { bill: { id: billId } },
    });
  }
}
