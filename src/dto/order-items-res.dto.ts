import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { CartItemsResDto } from './cart-items-res.dto';
import { OrdersResDto } from './orders-res.dto';
import { ShippingNoticesResDto } from './shipping-notices-res.dto';

export class OrderItemsResDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: () => OrdersResDto })
  @Type(() => OrdersResDto)
  order: OrdersResDto;

  @ApiProperty()
  price: number;

  @ApiProperty()
  status: number;

  @ApiProperty()
  shipping_date: Date;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  order_type: number;

  @ApiProperty({ type: CartItemsResDto })
  @Type(() => CartItemsResDto)
  cartItem: CartItemsResDto;

  @ApiProperty({ type: [ShippingNoticesResDto] })
  @ValidateNested({ each: true })
  @Type(() => ShippingNoticesResDto)
  shippingNotices?: ShippingNoticesResDto[];

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;
}
