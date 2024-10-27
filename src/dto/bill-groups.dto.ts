import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BillsResDto } from './bills-res.dto';
import { StoresResDto } from './stores-res.dto';

export class BillGroupsDto {
  @ApiProperty({ type: BillsResDto })
  @Type(() => BillsResDto)
  bill: BillsResDto;

  @ApiProperty({ type: StoresResDto })
  @Type(() => StoresResDto)
  store: StoresResDto;

  @ApiProperty()
  reduced_taxable_amount: number;

  @ApiProperty()
  reduced_tax: number;

  @ApiProperty()
  taxable_amount: number;

  @ApiProperty()
  tax: number;

  @ApiProperty()
  shipping_fee: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  total_amount: number;

  @ApiProperty()
  order_type: number;
}
