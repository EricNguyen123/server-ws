import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ShippingSettingsResDto {
  @ApiProperty()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsNotEmpty()
  free_ship_amount: number;

  @ApiProperty()
  @IsNotEmpty()
  free_ship_number: number;

  @ApiProperty()
  createdDate?: Date;

  @ApiProperty()
  updatedDate?: Date;
}
