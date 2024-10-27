import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShippingNoticesDto } from 'src/dto/shipping-notices.dto';
import { ShippingNoticesEntity } from 'src/entities/shipping-notices.entity';
import { Repository } from 'typeorm';
import { ShippingCompaniesService } from '../shipping-companies/shipping-companies.service';
import { OrderItemsService } from '../order-items/order-items.service';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@Injectable()
export class ShippingNoticesService {
  constructor(
    private readonly orderItemsService: OrderItemsService,
    private readonly shippingCompaniesService: ShippingCompaniesService,
    @InjectRepository(ShippingNoticesEntity)
    private readonly shippingNoticesRepository: Repository<ShippingNoticesEntity>,
  ) {}

  async createItem(
    dataDto: ShippingNoticesDto,
  ): Promise<ShippingNoticesEntity> {
    const shippingCompany = await this.shippingCompaniesService.findOneById(
      dataDto.shipping_company_id,
    );
    if (!shippingCompany) {
      throw new NotFoundException(
        `Shipping company with ID "${dataDto.shipping_company_id}" not found.`,
      );
    }
    const orderItem = await this.orderItemsService.findOneById(
      dataDto.order_item_id,
    );
    if (!orderItem) {
      throw new NotFoundException(
        `Order item with ID "${dataDto.order_item_id}" not found.`,
      );
    }
    const shippingNotice = await this.shippingNoticesRepository.save({
      ...dataDto,
      shippingCompany,
      orderItem,
    });
    return shippingNotice;
  }

  async updateItem(
    id: string,
    dataDto: ShippingNoticesDto,
  ): Promise<ShippingNoticesEntity> {
    const shippingNotice = await this.findOneById(id);
    if (!shippingNotice)
      throw new NotFoundException('Shipping notice not found');
    Object.assign(shippingNotice, dataDto);
    return await this.shippingNoticesRepository.save(shippingNotice);
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const result = await this.shippingNoticesRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Shipping notice not found');
    return {
      status: 200,
      message: 'Shipping notice deleted successfully',
    };
  }

  async findByShipment(id: string): Promise<ShippingNoticesEntity[]> {
    return await this.shippingNoticesRepository.find({
      where: { shippingCompany: { id } },
      relations: ['shippingCompany', 'orderItem'],
    });
  }

  async findByOrderItem(id: string): Promise<ShippingNoticesEntity[]> {
    return await this.shippingNoticesRepository.find({
      where: { orderItem: { id } },
      relations: ['shippingCompany', 'orderItem'],
    });
  }

  async findOneById(id: string): Promise<ShippingNoticesEntity> {
    return await this.shippingNoticesRepository.findOneOrFail({
      where: { id },
      relations: ['shippingCompany', 'orderItem'],
    });
  }
}
