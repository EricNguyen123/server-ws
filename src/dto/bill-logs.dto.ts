import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class BillLogsDto {
  @ApiProperty()
  @IsUUID()
  bill_id: string;

  @ApiProperty()
  content: string;
}
