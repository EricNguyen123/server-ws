import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { ShippingSettingsResDto } from './shipping-settings-res.dto';
import { Type } from 'class-transformer';

export class PrefecturesResDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDate()
  createdDate: Date;

  @ApiProperty()
  @IsDate()
  updatedDate: Date;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  postcode?: string;

  @ApiProperty()
  shipping_fee: number;

  @ApiProperty()
  kind: number;

  @ApiProperty({ type: ShippingSettingsResDto })
  @Type(() => ShippingSettingsResDto)
  shippingSetting: ShippingSettingsResDto;

  @ApiProperty()
  label: string;
}
