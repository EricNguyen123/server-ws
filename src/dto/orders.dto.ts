import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { OrderItemsDto } from './order-items.dto';
import { Type } from 'class-transformer';
import { OrderStatus } from 'src/common/enums/order-status.enum';
import { ShippingStatus } from 'src/common/enums/shipping-status.enum';
import { BillsResDto } from './bills-res.dto';

export class OrdersDto {
  @ApiProperty()
  @IsUUID()
  orderer_id: string;

  @ApiProperty()
  orderer_type: string;

  @ApiProperty()
  @IsUUID()
  receiver_id: string;

  @ApiProperty()
  receiver_type: string;

  @ApiProperty({ type: () => BillsResDto })
  @Type(() => BillsResDto)
  bill?: BillsResDto;

  @ApiProperty()
  order_status?: OrderStatus;

  @ApiProperty()
  shipping_status?: ShippingStatus;

  @ApiProperty()
  order_id: string;

  @ApiProperty()
  order_date: Date;

  @ApiProperty()
  order_at: Date;

  @ApiProperty()
  memo: string;

  @ApiProperty()
  order_type: number;

  @ApiProperty()
  @IsUUID()
  user_id: string;

  @ApiProperty({ type: [OrderItemsDto] })
  @Type(() => OrderItemsDto)
  orderItems: OrderItemsDto[];
}
