import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShippingInstructionsEntity } from 'src/entities/shipping-instructions.entity';
import { Repository } from 'typeorm';
import { OrderItemsService } from '../order-items/order-items.service';
import { ShippingInstructionsDto } from 'src/dto/shipping-instructions.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@Injectable()
export class ShippingInstructionsService {
  constructor(
    private readonly orderItemsService: OrderItemsService,
    @InjectRepository(ShippingInstructionsEntity)
    private readonly shippingInstructionsRepository: Repository<ShippingInstructionsEntity>,
  ) {}

  async createItem(
    dataDto: ShippingInstructionsDto,
  ): Promise<ShippingInstructionsEntity> {
    const orderItem = await this.orderItemsService.findOneById(
      dataDto.order_item_id,
    );
    if (!orderItem) {
      throw new NotFoundException('Order item not found');
    }
    const shippingInstructions = new ShippingInstructionsEntity();
    Object.assign(shippingInstructions, {
      orderItem,
      shipping_department: dataDto.shipping_department,
      shipping_source: dataDto.shipping_source,
      email: dataDto.email,
      subject: dataDto.subject,
      content: dataDto.content,
      memo: dataDto.memo,
    });
    return await this.shippingInstructionsRepository.save(shippingInstructions);
  }

  async updateItem(
    id: string,
    dataDto: ShippingInstructionsDto,
  ): Promise<ShippingInstructionsEntity> {
    const shippingInstructions = await this.findOneById(id);
    if (!shippingInstructions) {
      throw new NotFoundException('Shipping instructions not found');
    }
    Object.assign(shippingInstructions, {
      shipping_department: dataDto.shipping_department,
      shipping_source: dataDto.shipping_source,
      email: dataDto.email,
      subject: dataDto.subject,
      content: dataDto.content,
      memo: dataDto.memo,
    });
    return await this.shippingInstructionsRepository.save(shippingInstructions);
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const result = await this.shippingInstructionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Shipping instructions not found');
    }
    return {
      status: 200,
      message: 'Shipping instructions deleted successfully',
    };
  }

  async findAll(): Promise<ShippingInstructionsEntity[]> {
    return await this.shippingInstructionsRepository.find({
      relations: ['orderItem'],
    });
  }

  async findOneById(id: string): Promise<ShippingInstructionsEntity> {
    return await this.shippingInstructionsRepository.findOneOrFail({
      where: { id: id },
      relations: ['orderItem'],
    });
  }
}
