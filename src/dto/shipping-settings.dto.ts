import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ShippingSettingsDto {
  @ApiProperty()
  @IsNotEmpty()
  free_ship_amount: number;

  @ApiProperty()
  @IsNotEmpty()
  free_ship_number: number;
}
