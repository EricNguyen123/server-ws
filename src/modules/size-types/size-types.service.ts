import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';
import { SizeTypesDto } from 'src/dto/size-types.dto';
import { SizeTypesEntity } from 'src/entities/size-types.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SizeTypesService {
  constructor(
    @InjectRepository(SizeTypesEntity)
    private readonly sizeTypesRepository: Repository<SizeTypesEntity>,
  ) {}

  async createItem(sizeTypesDto: SizeTypesDto): Promise<SizeTypesEntity> {
    const sizeType = await this.sizeTypesRepository.save(sizeTypesDto);
    return sizeType;
  }

  async updateItem(
    id: string,
    sizeTypesDto: SizeTypesDto,
  ): Promise<SizeTypesEntity> {
    const sizeType = await this.findOneById(id);
    if (!sizeType) throw new NotFoundException('Size type not found');

    sizeType.size_code = sizeTypesDto.size_code;
    sizeType.size_type = sizeTypesDto.size_type;
    return await this.sizeTypesRepository.save(sizeType);
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const result = await this.sizeTypesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Size type not found');
    }

    return {
      status: 200,
      message: 'Size type deleted successfully',
    };
  }

  async findAll(): Promise<SizeTypesEntity[]> {
    return await this.sizeTypesRepository.find();
  }

  async findOneById(id: string): Promise<SizeTypesEntity> {
    const sizeType = await this.sizeTypesRepository.findOneOrFail({
      where: { id: id },
    });

    if (!sizeType) {
      throw new Error(`Size type with ID "${id}" not found`);
    }

    return sizeType;
  }
}
