import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ProductsResDto } from './products-res.dto';
import { Type } from 'class-transformer';
import { CampaignResDto } from './campaigns-res.dto';

export class CampaignProductsResDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: CampaignResDto })
  @Type(() => CampaignResDto)
  campaign: CampaignResDto;

  @ApiProperty({ type: () => ProductsResDto })
  @Type(() => ProductsResDto)
  product: ProductsResDto;

  @ApiProperty()
  product_type: number;

  @ApiProperty()
  discount_value: number;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;
}
