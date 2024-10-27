import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorTypesDto } from 'src/dto/color-types.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';
import { ColorTypesEntity } from 'src/entities/color-types.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColorTypesService {
  constructor(
    @InjectRepository(ColorTypesEntity)
    private readonly colorTypesRepository: Repository<ColorTypesEntity>,
  ) {}

  async createItem(colorTypesDto: ColorTypesDto): Promise<ColorTypesEntity> {
    const color = await this.colorTypesRepository.save(colorTypesDto);
    return color;
  }

  async updateItem(
    id: string,
    colorTypesDto: ColorTypesDto,
  ): Promise<ColorTypesEntity> {
    const color = await this.findOneById(id);
    if (!color) throw new NotFoundException('Color not found');

    color.color_code = colorTypesDto.color_code;
    return await this.colorTypesRepository.save(color);
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const result = await this.colorTypesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Color not found');
    }
    return {
      status: 200,
      message: 'Color deleted successfully',
    };
  }

  async findAll(): Promise<ColorTypesEntity[]> {
    return await this.colorTypesRepository.find();
  }

  async findOneById(id: string): Promise<ColorTypesEntity> {
    const color = await this.colorTypesRepository.findOneOrFail({
      where: { id: id },
    });

    if (!color) {
      throw new NotFoundException(`Color with ID "${id}" not found`);
    }

    return color;
  }
}
