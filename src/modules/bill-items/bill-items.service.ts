import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillItemsDto } from 'src/dto/bill-items.dto';
import { BillItemsEntity } from 'src/entities/bill-items.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillItemsService {
  constructor(
    @InjectRepository(BillItemsEntity)
    private readonly billItemsRepository: Repository<BillItemsEntity>,
  ) {}

  async createItem(billItemsDto: BillItemsDto): Promise<BillItemsEntity> {
    const newBillItem = this.billItemsRepository.create(billItemsDto);
    return await this.billItemsRepository.save(newBillItem);
  }

  async findOndeById(id: string): Promise<BillItemsEntity> {
    const billItem = await this.billItemsRepository.findOneOrFail({
      where: { id: id },
    });
    if (!billItem) {
      throw new NotFoundException(`Bill items with ID "${id}" not found`);
    }
    return billItem;
  }

  async findAll(): Promise<BillItemsEntity[]> {
    return await this.billItemsRepository.find();
  }

  async findByBillGroupId(groupId: string): Promise<BillItemsEntity[]> {
    const billItems = await this.billItemsRepository.find({
      where: { billGroup: { id: groupId } },
    });
    if (!billItems) {
      throw new NotFoundException(
        `Bill items not found for group "${groupId}"`,
      );
    }
    return billItems;
  }
}
