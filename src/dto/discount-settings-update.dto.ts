import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class DiscountSettingsUpdateDto {
  @ApiProperty({ description: 'Discounts ettings id' })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'product id' })
  @IsString()
  @IsUUID()
  productId: string;

  @ApiProperty({ description: 'custom discount value' })
  @IsNumber()
  customDiscountValue: number;
}
