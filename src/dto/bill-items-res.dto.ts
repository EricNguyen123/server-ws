import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProductTypesResDto } from './product-types-res.dto';

export class BillItemsResDto {
  @ApiProperty()
  quantity: number;

  @ApiProperty({ type: ProductTypesResDto })
  @Type(() => ProductTypesResDto)
  productType: ProductTypesResDto;

  @ApiProperty()
  price: number;

  @ApiProperty()
  order_id: string;

  @ApiProperty()
  order_at: Date;
}
