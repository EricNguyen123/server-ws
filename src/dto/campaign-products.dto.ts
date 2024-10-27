import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CampaignProductsDto {
  @ApiProperty()
  @IsUUID()
  campaign_id: string;

  @ApiProperty()
  @IsUUID()
  product_id: string;

  @ApiProperty()
  product_type: number;

  @ApiProperty()
  discount_value: number;
}
