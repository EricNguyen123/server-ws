import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersDto } from 'src/dto/orders.dto';
import { OrdersEntity } from 'src/entities/orders.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';
import { OrderItemsService } from '../order-items/order-items.service';
import { ShippingNoticesService } from '../shipping-notices/shipping-notices.service';
import { ShippingInstructionsService } from '../shipping-instructions/shipping-instructions.service';
import { ShippingNoticesEntity } from 'src/entities/shipping-notices.entity';
import { OrderItemsEntity } from 'src/entities/order-items.entity';
import { OrderItemsDto } from 'src/dto/order-items.dto';
import { ShippingInstructionsEntity } from 'src/entities/shipping-instructions.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly shippingInstructionsService: ShippingInstructionsService,
    private readonly shippingNoticesService: ShippingNoticesService,
    private readonly usersService: UserService,
    private readonly orderItemsService: OrderItemsService,
    @InjectRepository(OrdersEntity)
    private readonly ordersRepository: Repository<OrdersEntity>,
  ) {}

  async createItem(dataDto: OrdersDto): Promise<OrdersEntity> {
    const orderer = await this.usersService.findOneById(dataDto.orderer_id);
    const receiver = await this.usersService.findOneById(dataDto.receiver_id);
    const user = await this.usersService.findOneById(dataDto.user_id);
    if (!orderer || !receiver || !user) {
      throw new NotFoundException('User not found');
    }
    const orderId = await this.generateOrderId();
    const order = await this.ordersRepository.save({
      ...dataDto,
      orderItems: [],
      order_id: orderId,
      receiver: receiver,
      user: user,
      orderer: orderer,
    });

    if (dataDto.orderItems && dataDto.orderItems.length > 0) {
      for (const item of dataDto.orderItems) {
        const orderItemDto = {
          ...item,
          order_id: order.id,
        };

        const newOrderItem =
          await this.orderItemsService.createItem(orderItemDto);
        const orderItem = await this.orderItemsService.findOneById(
          newOrderItem.id,
        );

        await this.createShippingNotices(orderItem, item);
        await this.createShippingInstructions(orderItem, item);
      }
    }
    return await this.findOneById(order.id);
  }

  async createShippingNotices(
    orderItem: OrderItemsEntity,
    item: OrderItemsDto,
  ): Promise<ShippingNoticesEntity> {
    return await this.shippingNoticesService.createItem({
      order_item_id: orderItem.id,
      shipping_company_id: item.shipping_company_id,
      document_number: '0',
      subject: orderItem.cartItem.productType.product.name,
      content: `x${orderItem.cartItem.quantity} - ${orderItem.cartItem.productType.product.price}`,
      memo: 'test',
    });
  }

  async createShippingInstructions(
    orderItem: OrderItemsEntity,
    item: OrderItemsDto,
  ): Promise<ShippingInstructionsEntity> {
    return await this.shippingInstructionsService.createItem({
      order_item_id: orderItem.id,
      shipping_department: item.shippingInstructions.shipping_department,
      shipping_source: item.shippingInstructions.shipping_source,
      email: item.shippingInstructions.email,
      subject: item.shippingInstructions.subject,
      content: item.shippingInstructions.content,
      memo: item.shippingInstructions.memo,
    });
  }

  async updateItem(id: string, dataDto: OrdersDto): Promise<OrdersEntity> {
    const order = await this.findOneById(id);
    Object.assign(order, dataDto);
    return await this.ordersRepository.save(order);
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const result = await this.ordersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Order not found');
    }
    return {
      status: 200,
      message: 'Order deleted successfully',
    };
  }

  async findAll(): Promise<OrdersEntity[]> {
    return await this.ordersRepository.find({
      relations: [
        'user',
        'orderer',
        'receiver',
        'orderItems',
        'orderItems.cartItem',
        'orderItems.cartItem.productType',
        'orderItems.cartItem.productType.product',
        'orderItems.cartItem.productType.product.mediaItems',
        'orderItems.cartItem.productType.product.mediaItems.activeStorageAttachments',
        'orderItems.cartItem.productType.product.mediaItems.activeStorageAttachments.activeStorageBlob',
        'orderItems.cartItem.productType.product.discountSettings',
        'orderItems.cartItem.productType.colorType',
        'orderItems.cartItem.productType.sizeType',
        'orderItems.cartItem.productType.sizeType',
        'orderItems.cartItem.store',
        'orderItems.cartItem.campaign',
        'orderItems.shippingNotices',
        'orderItems.shippingNotices.shippingCompany',
      ],
    });
  }

  async findOneById(id: string): Promise<OrdersEntity> {
    const order = await this.ordersRepository.findOneOrFail({
      where: { id: id },
      relations: [
        'user',
        'orderer',
        'receiver',
        'orderItems',
        'orderItems.cartItem',
        'orderItems.cartItem.productType',
        'orderItems.cartItem.productType.product',
        'orderItems.cartItem.productType.product.mediaItems',
        'orderItems.cartItem.productType.product.mediaItems.activeStorageAttachments',
        'orderItems.cartItem.productType.product.mediaItems.activeStorageAttachments.activeStorageBlob',
        'orderItems.cartItem.productType.product.discountSettings',
        'orderItems.cartItem.productType.colorType',
        'orderItems.cartItem.productType.sizeType',
        'orderItems.cartItem.productType.sizeType',
        'orderItems.cartItem.store',
        'orderItems.cartItem.campaign',
        'orderItems.shippingNotices',
        'orderItems.shippingNotices.shippingCompany',
      ],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async generateOrderId(): Promise<string> {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const today = `${year}-${month}-${day}`;
    const orderCountToday = await this.ordersRepository
      .createQueryBuilder('orders')
      .where('DATE(orders.createdDate) = :today', { today })
      .getCount();

    const orderSequence = (orderCountToday + 1).toString().padStart(4, '0');
    const orderId = `ORDER${year}${month}${day}-${orderSequence}`;
    return orderId;
  }
}
