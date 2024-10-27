import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { OrderItemsResDto } from './order-items-res.dto';

export class ShippingInstructionsResDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  shipping_department: number;

  @ApiProperty()
  shipping_source: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  memo: string;

  @ApiProperty({ type: () => OrderItemsResDto })
  @Type(() => OrderItemsResDto)
  orderItem?: OrderItemsResDto;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;
}
