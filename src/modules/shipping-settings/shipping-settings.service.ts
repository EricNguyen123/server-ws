import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';
import { ShippingSettingsResDto } from 'src/dto/shipping-settings-res.dto';
import { ShippingSettingsDto } from 'src/dto/shipping-settings.dto';
import { ShippingSettingsEntity } from 'src/entities/shipping-settings.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShippingSettingsService {
  constructor(
    @InjectRepository(ShippingSettingsEntity)
    private readonly shippingSettingsRepository: Repository<ShippingSettingsEntity>,
  ) {}

  async createItem(
    shippingSettingsDto: ShippingSettingsDto,
  ): Promise<ShippingSettingsResDto> {
    const shippingSettings =
      await this.shippingSettingsRepository.save(shippingSettingsDto);
    return shippingSettings;
  }

  async updateItem(
    id: string,
    shippingSettingsDto: ShippingSettingsDto,
  ): Promise<ShippingSettingsResDto> {
    const shippingSetting = await this.findOneById(id);

    if (!shippingSetting) {
      throw new NotFoundException('Shipping Settings not found');
    }

    Object.assign(shippingSetting, shippingSettingsDto);

    const updateShippingSetting =
      await this.shippingSettingsRepository.save(shippingSetting);

    return updateShippingSetting;
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const shippingSetting = await this.findOneById(id);

    if (!shippingSetting) {
      throw new NotFoundException('Shipping Settings not found');
    }

    const deleteShippingSetting =
      await this.shippingSettingsRepository.delete(id);

    if (deleteShippingSetting.affected === 0) {
      throw new NotFoundException(`Shipping Setting with ID "${id}" not found`);
    }

    return {
      status: 200,
      message: 'Shipping Settings deleted successfully',
    };
  }

  async findOneById(id: string) {
    const shippingSetting = await this.shippingSettingsRepository.findOneOrFail(
      { where: { id } },
    );

    if (!shippingSetting) {
      throw new NotFoundException('Shipping Settings not found');
    }

    return shippingSetting;
  }

  async findAll(): Promise<ShippingSettingsResDto[]> {
    const shippingSettings = await this.shippingSettingsRepository.find();

    if (!shippingSettings) {
      throw new NotFoundException('No Shipping Settings found');
    }

    return shippingSettings;
  }
}
