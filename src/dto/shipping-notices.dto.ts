import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ShippingNoticesDto {
  @ApiProperty()
  @IsUUID()
  order_item_id: string;

  @ApiProperty()
  @IsUUID()
  shipping_company_id: string;

  @ApiProperty({ type: 'varchar', maxLength: 255 })
  document_number: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  memo: string;
}
