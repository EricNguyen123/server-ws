import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemsEntity } from 'src/entities/order-items.entity';
import { Repository } from 'typeorm';
import { CartItemsService } from '../cart-items/cart-items.service';
import { OrderItemsDto } from 'src/dto/order-items.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class OrderItemsService {
  constructor(
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
    private readonly cartItemsService: CartItemsService,
    @InjectRepository(OrderItemsEntity)
    private readonly orderItemsRepository: Repository<OrderItemsEntity>,
  ) {}

  async createItem(dataDto: OrderItemsDto): Promise<OrderItemsEntity> {
    const cartItem = await this.cartItemsService.findOneById(
      dataDto.cart_item_id,
    );
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }
    const order = await this.ordersService.findOneById(dataDto.order_id);
    const orderItems = new OrderItemsEntity();
    orderItems.cartItem = cartItem;
    orderItems.order = order;
    orderItems.price = dataDto.price;
    orderItems.status = dataDto.status;
    orderItems.shipping_date = dataDto.shipping_date;
    orderItems.order_type = dataDto.order_type;
    orderItems.quantity = dataDto.quantity;
    return await this.orderItemsRepository.save(orderItems);
  }

  async updateItem(
    id: string,
    dataDto: OrderItemsDto,
  ): Promise<OrderItemsEntity> {
    const cartItem = await this.cartItemsService.findOneById(
      dataDto.cart_item_id,
    );
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }
    const orderItems = await this.findOneById(id);
    Object.assign(orderItems, {
      ...dataDto,
      cartItem,
    });
    return await this.orderItemsRepository.save(orderItems);
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const result = await this.orderItemsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order items with ID "${id}" not found.`);
    }
    return {
      status: 200,
      message: 'Order items deleted successfully.',
    };
  }

  async findOneById(id: string): Promise<OrderItemsEntity> {
    const orderItems = await this.orderItemsRepository.findOneOrFail({
      where: { id: id },
      relations: [
        'cartItem',
        'cartItem.productType',
        'cartItem.productType.product',
        'cartItem.productType.product.mediaItems',
        'cartItem.productType.product.mediaItems.activeStorageAttachments',
        'cartItem.productType.product.mediaItems.activeStorageAttachments.activeStorageBlob',
        'cartItem.productType.product.discountSettings',
        'cartItem.productType.colorType',
        'cartItem.productType.sizeType',
        'cartItem.productType.sizeType',
        'cartItem.store',
        'cartItem.campaign',
      ],
    });
    if (!orderItems) {
      throw new NotFoundException(`Order items with ID "${id}" not found`);
    }
    return orderItems;
  }
}
