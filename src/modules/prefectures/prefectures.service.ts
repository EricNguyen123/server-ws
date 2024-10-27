import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrefecturesEntity } from 'src/entities/prefectures.entity';
import { Repository } from 'typeorm';
import { ShippingSettingsService } from '../shipping-settings/shipping-settings.service';
import { PrefecturesDto } from 'src/dto/prefectures.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@Injectable()
export class PrefecturesService {
  constructor(
    private readonly shippingSettingsService: ShippingSettingsService,
    @InjectRepository(PrefecturesEntity)
    private readonly prefecturesRepository: Repository<PrefecturesEntity>,
  ) {}

  async createItem(prefecturesDto: PrefecturesDto): Promise<PrefecturesEntity> {
    const shippingSetting = await this.shippingSettingsService.findOneById(
      prefecturesDto.shipping_setting_id,
    );

    if (!shippingSetting) {
      throw new NotFoundException('Shipping setting not found');
    }

    const prefecture = new PrefecturesEntity();
    prefecture.kind = prefecturesDto.kind;
    prefecture.label = prefecturesDto.label;
    prefecture.name = prefecturesDto.name;
    prefecture.postcode = prefecturesDto.postcode;
    prefecture.shipping_fee = prefecturesDto.shipping_fee;
    prefecture.shippingSetting = shippingSetting;
    return await this.prefecturesRepository.save(prefecture);
  }

  async updateItem(
    id: string,
    prefecturesDto: PrefecturesDto,
  ): Promise<PrefecturesEntity> {
    const prefecture = await this.findOneById(id);

    if (!prefecture) {
      throw new NotFoundException('Prefecture not found');
    }

    const shippingSetting = await this.shippingSettingsService.findOneById(
      prefecturesDto.shipping_setting_id,
    );

    if (!shippingSetting) {
      throw new NotFoundException('Shipping setting not found');
    }

    prefecture.kind = prefecturesDto.kind;
    prefecture.label = prefecturesDto.label;
    prefecture.name = prefecturesDto.name;
    prefecture.postcode = prefecturesDto.postcode;
    prefecture.shipping_fee = prefecturesDto.shipping_fee;
    prefecture.shippingSetting = shippingSetting;

    return await this.prefecturesRepository.save(prefecture);
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const result = await this.prefecturesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Prefecture with ID "${id}" not found`);
    }

    return {
      status: 200,
      message: 'Prefecture deleted successfully',
    };
  }

  async findAll(): Promise<PrefecturesEntity[]> {
    return await this.prefecturesRepository.find({
      relations: ['shippingSetting'],
    });
  }

  async findOneById(id: string): Promise<PrefecturesEntity> {
    const prefecture = await this.prefecturesRepository.findOneOrFail({
      where: { id },
      relations: ['shippingSetting'],
    });

    if (!prefecture) {
      throw new NotFoundException('Prefecture not found');
    }

    return prefecture;
  }

  async findOneByName(name: string): Promise<PrefecturesEntity> {
    const prefecture = await this.prefecturesRepository.findOneOrFail({
      where: { name },
      relations: ['shippingSetting'],
    });

    if (!prefecture) {
      throw new NotFoundException('Prefecture not found');
    }

    return prefecture;
  }
}
