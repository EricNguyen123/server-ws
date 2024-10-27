import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { ShippingInstructionsDto } from './shipping-instructions.dto';

export class OrderItemsDto {
  @ApiProperty()
  order_id?: string;

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

  @ApiProperty()
  @IsUUID()
  cart_item_id: string;

  @ApiProperty()
  @IsUUID()
  shipping_company_id: string;

  @ApiProperty({ type: ShippingInstructionsDto })
  @Type(() => ShippingInstructionsDto)
  shippingInstructions: ShippingInstructionsDto;
}
