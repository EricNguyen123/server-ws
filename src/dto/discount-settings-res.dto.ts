import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { ProductsResDto } from './products-res.dto';
import { Type } from 'class-transformer';

export class DiscountSettingsResDto {
  @ApiProperty()
  @IsString()
  id?: string;

  @ApiProperty({ description: 'custom discount value' })
  @IsNumber()
  custom_discount_value: number;

  @ApiProperty({ type: ProductsResDto })
  @ValidateNested({ each: true })
  @Type(() => ProductsResDto)
  product: ProductsResDto;

  @ApiProperty()
  createdDate?: Date;

  @ApiProperty()
  updatedDate?: Date;
}
