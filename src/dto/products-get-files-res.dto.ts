import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MediaItemDto } from './media-items-res.dto';
import { FileDto } from './files-res.dto';
import { DiscountSettingsProductsDto } from './discount-settings-product.dto';
import { CampaignProductsResDto } from './campaign-products-res.dto';

export class ProductsGetFilesResResDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  quantity_alert: number;

  @ApiProperty()
  @IsNumber()
  order_unit: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  status: number;

  @ApiProperty()
  @IsNumber()
  multiplication_rate: number;

  @ApiProperty()
  @IsNumber()
  discount: number;

  @ApiProperty()
  @IsDate()
  createdDate: Date;

  @ApiProperty()
  @IsDate()
  updatedDate: Date;

  @ApiProperty({ type: [MediaItemDto] })
  @ValidateNested({ each: true })
  @Type(() => MediaItemDto)
  mediaItems: MediaItemDto[];

  @ApiProperty({ type: [DiscountSettingsProductsDto] })
  @ValidateNested({ each: true })
  @Type(() => DiscountSettingsProductsDto)
  discountSettings: DiscountSettingsProductsDto[];

  @ApiProperty({ type: [CampaignProductsResDto] })
  @ValidateNested({ each: true })
  @Type(() => CampaignProductsResDto)
  campaignProducts?: CampaignProductsResDto[];

  @ApiProperty({ type: [FileDto] })
  @ValidateNested({ each: true })
  @Type(() => FileDto)
  files: FileDto[];
}
