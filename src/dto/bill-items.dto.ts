import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BillGroupsResDto } from './bill-groups-res.dto';
import { ProductTypesResDto } from './product-types-res.dto';

export class BillItemsDto {
  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  order_id: string;

  @ApiProperty()
  order_at: Date;

  @ApiProperty({ type: ProductTypesResDto })
  @Type(() => ProductTypesResDto)
  productType: ProductTypesResDto;

  @ApiProperty({ type: BillGroupsResDto })
  @Type(() => BillGroupsResDto)
  billGroup: BillGroupsResDto;
}
