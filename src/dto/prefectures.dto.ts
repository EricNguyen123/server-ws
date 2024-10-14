import { ApiProperty } from '@nestjs/swagger';

export class PrefecturesDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  postcode?: string;

  @ApiProperty()
  shipping_fee: number;

  @ApiProperty()
  kind: number;

  @ApiProperty()
  shipping_setting_id: string;

  @ApiProperty()
  label: string;
}
