import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class DiscountSettingsDeleteDto {
  @ApiProperty({ description: 'Discounts ettings id' })
  @IsString()
  @IsUUID()
  id: string;
}
