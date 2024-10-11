import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class DiscountSettingsFindDto {
  @ApiProperty({ description: 'product id' })
  @IsString()
  @IsUUID()
  productId: string;
}
