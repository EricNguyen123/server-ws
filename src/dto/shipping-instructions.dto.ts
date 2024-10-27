import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID } from 'class-validator';

export class ShippingInstructionsDto {
  @ApiProperty()
  @IsUUID()
  order_item_id?: string;

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
}
