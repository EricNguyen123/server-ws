import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { MediaItemDto } from './media-items-res.dto';
import { Type } from 'class-transformer';
import { DiscountSettingsProductsDto } from './discount-settings-product.dto';

export class ProductsResDto {
  @ApiProperty()
  @IsString()
  id?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  code?: string;

  @ApiProperty()
  price?: number;

  @ApiProperty()
  quantity?: number;

  @ApiProperty()
  quantity_alert?: number;

  @ApiProperty()
  order_unit?: number;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  status?: number;

  @ApiProperty()
  multiplication_rate?: number;

  @ApiProperty()
  discount?: number;

  @ApiProperty({ type: [MediaItemDto] })
  @ValidateNested({ each: true })
  @Type(() => MediaItemDto)
  mediaItems?: MediaItemDto[];

  @ApiProperty({ type: [DiscountSettingsProductsDto] })
  @ValidateNested({ each: true })
  @Type(() => DiscountSettingsProductsDto)
  discountSettings?: DiscountSettingsProductsDto[];

  @ApiProperty()
  createdDate?: Date;

  @ApiProperty()
  updatedDate?: Date;
}
