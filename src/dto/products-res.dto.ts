import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProductsResDto {
  @ApiProperty()
  @IsString()
  id?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  code?: string;

  @ApiProperty()
  price?: number;

  @ApiProperty()
  quantity?: number;

  @ApiProperty()
  quantity_alert?: number;

  @ApiProperty()
  order_unit?: number;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  status?: number;

  @ApiProperty()
  multiplication_rate?: number;

  @ApiProperty()
  discount?: number;

  @ApiProperty()
  createdDate?: Date;

  @ApiProperty()
  updatedDate?: Date;
}
