import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DiscountSettingsProductsDto {
  @ApiProperty()
  @IsString()
  id?: string;

  @ApiProperty({ description: 'custom discount value' })
  @IsNumber()
  custom_discount_value: number;

  @ApiProperty()
  createdDate?: Date;

  @ApiProperty()
  updatedDate?: Date;
}
