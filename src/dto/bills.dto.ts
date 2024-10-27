import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { OrdersPostBillsDto } from './orders-post-bills.dto';

export class BillsDto {
  @ApiProperty()
  status: number;

  @ApiProperty()
  export_at: Date;

  @ApiProperty()
  bill_id: string;

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

  @ApiProperty({ type: () => OrdersPostBillsDto })
  @Type(() => OrdersPostBillsDto)
  order: OrdersPostBillsDto;
}
