import { ApiProperty } from '@nestjs/swagger';

export class ProductsPostDto {
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
}
