import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountSettingsEntity } from 'src/entities/discount-settings.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { DiscountSettingsDto } from 'src/dto/discount-settings.dto';
import { DiscountSettingsUpdateDto } from 'src/dto/discount-settings-update.dto';
import { DiscountSettingsDeleteDto } from 'src/dto/discount-settings-delete.dto';
import { DiscountSettingsFindDto } from 'src/dto/discount-settings-find.dto';

@Injectable()
export class DiscountSettingsService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(DiscountSettingsEntity)
    private readonly discountSettingsRepository: Repository<DiscountSettingsEntity>,
  ) {}

  async createDiscountSettings(discountSettingsDto: DiscountSettingsDto) {
    const product = await this.productsService.findOneByProduct(
      discountSettingsDto.productId,
    );

    if (!product) {
      throw new Error('Product not found');
    }

    const discountSettings = new DiscountSettingsEntity();
    discountSettings.custom_discount_value =
      discountSettingsDto.customDiscountValue;
    discountSettings.product = product;

    return await this.discountSettingsRepository.save(discountSettings);
  }

  async updateDiscountSettings(
    discountSettingsupdateDto: DiscountSettingsUpdateDto,
  ) {
    const discountSetings = await this.discountSettingsRepository.findOneOrFail(
      {
        where: { id: discountSettingsupdateDto.id },
        relations: ['product'],
      },
    );

    if (!discountSetings) {
      throw new Error('DiscountSettings not found');
    }

    const product = await this.productsService.findOneByProduct(
      discountSettingsupdateDto.productId,
    );

    if (!product) {
      throw new Error('Product not found');
    }

    discountSetings.custom_discount_value =
      discountSettingsupdateDto.customDiscountValue;

    return await this.discountSettingsRepository.save(discountSetings);
  }

  async deleteDiscountSettings(
    discountSettingsDeleteDto: DiscountSettingsDeleteDto,
  ) {
    const discountSetings = await this.discountSettingsRepository.findOneOrFail(
      {
        where: { id: discountSettingsDeleteDto.id },
      },
    );

    if (!discountSetings) {
      throw new Error('DiscountSettings not found');
    }

    const result =
      await this.discountSettingsRepository.remove(discountSetings);

    if (result) {
      return {
        status: 200,
        message: 'DiscountSettings deleted successfully',
      };
    }

    throw new Error('DiscountSettings delete failure');
  }

  async findDiscountSettings(discountSettingsFindDto: DiscountSettingsFindDto) {
    const discountSetings = await this.discountSettingsRepository.findOneOrFail(
      {
        where: { product: { id: discountSettingsFindDto.productId } },
        relations: ['product'],
      },
    );

    if (!discountSetings) {
      throw new Error('DiscountSettings not found');
    }
  }
}
