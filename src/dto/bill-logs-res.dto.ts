import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BillsResDto } from './bills-res.dto';
import { Type } from 'class-transformer';

export class BillLogsResDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: BillsResDto })
  @Type(() => BillsResDto)
  bill: BillsResDto;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;
}
