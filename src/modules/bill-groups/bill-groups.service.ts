import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillGroupsDto } from 'src/dto/bill-groups.dto';
import { BillGroupsEntity } from 'src/entities/bill-groups.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillGroupsService {
  constructor(
    @InjectRepository(BillGroupsEntity)
    private readonly billGroupsRepository: Repository<BillGroupsEntity>,
  ) {}

  async createItem(dataDto: BillGroupsDto): Promise<BillGroupsEntity> {
    return await this.billGroupsRepository.save(dataDto);
  }

  async findOneById(id: string): Promise<BillGroupsEntity> {
    const billGroups = await this.billGroupsRepository.findOneOrFail({
      where: { id: id },
    });
    if (!billGroups) {
      throw new NotFoundException(`Bill Groups with ID "${id}" not found`);
    }
    return billGroups;
  }

  async findAll(): Promise<BillGroupsEntity[]> {
    return await this.billGroupsRepository.find();
  }

  async findAllByBillId(id: string): Promise<BillGroupsEntity[]> {
    const billGroups = await this.billGroupsRepository.find({
      where: { bill: { id: id } },
    });
    return billGroups;
  }
}
