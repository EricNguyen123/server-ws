import { ApiProperty } from '@nestjs/swagger';
import { BillsResDto } from './bills-res.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class BillsPaginationResDto {
  @ApiProperty({ type: [BillsResDto] })
  @ValidateNested({ each: true })
  @Type(() => BillsResDto)
  bills: BillsResDto[];

  @ApiProperty()
  totalBills: number;

  @ApiProperty()
  currentPage: number;
}
