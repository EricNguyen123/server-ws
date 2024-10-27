import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { BillGroupsResDto } from './bill-groups-res.dto';
import { OrdersResDto } from './orders-res.dto';

export class BillsResDto {
  @ApiProperty()
  @IsString()
  id: string;

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

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;

  @ApiProperty({ type: () => [BillGroupsResDto] })
  @ValidateNested({ each: true })
  @Type(() => BillGroupsResDto)
  billGroups?: BillGroupsResDto[];

  @ApiProperty({ type: () => [OrdersResDto] })
  @ValidateNested({ each: true })
  @Type(() => OrdersResDto)
  orders?: OrdersResDto[];
}
