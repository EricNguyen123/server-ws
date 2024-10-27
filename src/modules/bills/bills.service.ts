import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillsDto } from 'src/dto/bills.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';
import { OrdersDto } from 'src/dto/orders.dto';
import { BillsEntity } from 'src/entities/bills.entity';
import { Repository } from 'typeorm';
import { OrdersService } from '../orders/orders.service';
import { OrderItemsEntity } from 'src/entities/order-items.entity';
import { PrefecturesService } from '../prefectures/prefectures.service';
import { StorePrefecturesService } from '../store-prefectures/store-prefectures.service';
import { CampaignProductsService } from '../campaign-products/campaign-products.service';
import { BillGroupsService } from '../bill-groups/bill-groups.service';
import { BillItemsService } from '../bill-items/bill-items.service';
import { PaginationDto } from 'src/dto/pagination.dto';

@Injectable()
export class BillsService {
  constructor(
    private readonly billItemsService: BillItemsService,
    private readonly billGroupsService: BillGroupsService,
    private readonly campaignProductsService: CampaignProductsService,
    private readonly storePrefecturesService: StorePrefecturesService,
    private readonly prefecturesService: PrefecturesService,
    private readonly ordersService: OrdersService,
    @InjectRepository(BillsEntity)
    private readonly billsRepository: Repository<BillsEntity>,
  ) {}

  async createItem(dataDto: BillsDto): Promise<BillsEntity> {
    const bill_id = await this.generateBillId();
    const bill = new BillsEntity();
    Object.assign(bill, { ...dataDto, bill_id: bill_id });
    const newBill = await this.billsRepository.save(bill);
    const newOrder = await this.createOrder({
      ...dataDto.order,
      bill: newBill,
    });

    const prefecture = await this.prefecturesService.findOneByName(
      newOrder.receiver.prefecture,
    );

    const orderItems = newOrder.orderItems;

    const storeGroups: { [key: string]: OrderItemsEntity[] } =
      orderItems.reduce((groups, item) => {
        const storeId = item.cartItem.store.id;
        if (!groups[storeId]) {
          groups[storeId] = [];
        }
        groups[storeId].push(item);
        return groups;
      }, {});

    for (const [storeId, items] of Object.entries(storeGroups)) {
      const store = items[0].cartItem.store;
      const storePrefecture =
        await this.storePrefecturesService.findByPrefecturesAndStore(
          prefecture.id,
          storeId,
        );
      const totalAmount = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const shippingFee = storePrefecture.shipping_fee;
      const tax = Math.round(totalAmount * 0.1);

      let discount = 0;

      for (const item of items) {
        if (item.cartItem.campaign) {
          const discountItem =
            await this.campaignProductsService.findByProductIdAndCampaignId(
              item.cartItem.campaign.id,
              item.cartItem.productType.product.id,
            );
          discount += discountItem.discount_value * item.quantity;
        } else if (
          item.cartItem.product.discountSettings &&
          item.cartItem.product.discountSettings.length > 0
        ) {
          discount +=
            item.cartItem.product.discountSettings[0].custom_discount_value *
            item.quantity;
        } else {
          discount += item.cartItem.product.discount * item.quantity;
        }
      }

      newBill.total_amount += totalAmount + shippingFee - discount;
      newBill.discount += discount;
      newBill.tax += tax;
      newBill.amount += totalAmount + shippingFee;
      newBill.taxable_amount += totalAmount;
      newBill.shipping_fee += shippingFee;

      const newBillGroup = await this.billGroupsService.createItem({
        bill: newBill,
        store: store,
        taxable_amount: totalAmount,
        tax: tax,
        shipping_fee: shippingFee,
        amount: totalAmount + shippingFee,
        discount: discount,
        total_amount: totalAmount + shippingFee - discount,
        order_type: newOrder.order_type,
        reduced_taxable_amount: 0,
        reduced_tax: 0,
      });
      for (const item of items) {
        await this.billItemsService.createItem({
          quantity: item.quantity,
          price: item.price,
          order_id: newOrder.order_id,
          order_at: newOrder.order_at,
          billGroup: newBillGroup,
          productType: item.cartItem.productType,
        });
      }
    }
    await this.billsRepository.save(newBill);
    return await this.findOneById(newBill.id);
  }

  async createOrder(dataDto: OrdersDto) {
    const order = await this.ordersService.createItem(dataDto);
    return order;
  }

  async updateItem(id: string, dataDto: BillsDto): Promise<BillsEntity> {
    const bill = await this.findOneById(id);
    if (!bill) throw new NotFoundException('Bill not found');
    Object.assign(bill, dataDto);
    return await this.billsRepository.save(bill);
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const bill = await this.billsRepository.delete(id);
    if (bill.affected === 0) throw new NotFoundException('Bill not found');
    return {
      status: 200,
      message: 'Bill deleted successfully',
    };
  }

  async findAll(): Promise<BillsEntity[]> {
    return await this.billsRepository.find({
      relations: [
        'billLogs',
        'billGroups',
        'billGroups.billItems',
        'billGroups.billItems.productType',
        'billGroups.billItems.productType.product',
        'billGroups.billItems.productType.product.mediaItems',
        'billGroups.billItems.productType.product.mediaItems.activeStorageAttachments',
        'billGroups.billItems.productType.product.mediaItems.activeStorageAttachments.activeStorageBlob',
        'billGroups.billItems.productType.product.discountSettings',
        'billGroups.billItems.productType.colorType',
        'billGroups.billItems.productType.sizeType',
        'billGroups.store',
        'orders',
        'orders.user',
        'orders.orderer',
        'orders.receiver',
        'orders.orderItems',
        'orders.orderItems.cartItem',
        'orders.orderItems.cartItem.campaign',
        'orders.orderItems.shippingNotices',
        'orders.orderItems.shippingNotices.shippingCompany',
      ],
    });
  }

  async findOneById(id: string): Promise<BillsEntity> {
    const bill = await this.billsRepository.findOneOrFail({
      where: { id: id },
      relations: [
        'billLogs',
        'billGroups',
        'billGroups.billItems',
        'billGroups.billItems.productType',
        'billGroups.billItems.productType.product',
        'billGroups.billItems.productType.product.mediaItems',
        'billGroups.billItems.productType.product.mediaItems.activeStorageAttachments',
        'billGroups.billItems.productType.product.mediaItems.activeStorageAttachments.activeStorageBlob',
        'billGroups.billItems.productType.product.discountSettings',
        'billGroups.billItems.productType.colorType',
        'billGroups.billItems.productType.sizeType',
        'billGroups.store',
        'orders',
        'orders.user',
        'orders.orderer',
        'orders.receiver',
        'orders.orderItems',
        'orders.orderItems.cartItem',
        'orders.orderItems.cartItem.campaign',
        'orders.orderItems.shippingNotices',
        'orders.orderItems.shippingNotices.shippingCompany',
      ],
    });
    if (!bill) {
      throw new NotFoundException(`Bill with ID "${id}" not found`);
    }
    return bill;
  }

  async generateBillId(): Promise<string> {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const today = `${year}-${month}-${day}`;
    const billCountToday = await this.billsRepository
      .createQueryBuilder('bills')
      .where('DATE(bills.createdDate) = :today', { today })
      .getCount();

    const billSequence = (billCountToday + 1).toString().padStart(4, '0');
    const billId = `BILL${year}${month}${day}-${billSequence}`;
    return billId;
  }

  async findAllWithPagination(
    paginationDto: PaginationDto,
  ): Promise<BillsEntity[]> {
    const { offset, limit } = paginationDto;
    return await this.billsRepository.find({
      skip: offset,
      take: limit,
      relations: [
        'billLogs',
        'billGroups',
        'billGroups.billItems',
        'billGroups.billItems.productType',
        'billGroups.billItems.productType.product',
        'billGroups.billItems.productType.product.mediaItems',
        'billGroups.billItems.productType.product.mediaItems.activeStorageAttachments',
        'billGroups.billItems.productType.product.mediaItems.activeStorageAttachments.activeStorageBlob',
        'billGroups.billItems.productType.product.discountSettings',
        'billGroups.billItems.productType.colorType',
        'billGroups.billItems.productType.sizeType',
        'billGroups.store',
        'orders',
        'orders.user',
        'orders.orderer',
        'orders.receiver',
        'orders.orderItems',
        'orders.orderItems.cartItem',
        'orders.orderItems.cartItem.campaign',
        'orders.orderItems.shippingNotices',
        'orders.orderItems.shippingNotices.shippingCompany',
      ],
    });
  }
}
