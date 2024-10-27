import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CartItemsDto {
  @ApiProperty()
  @IsUUID()
  campaign_id: string;

  @ApiProperty()
  @IsUUID()
  product_id: string;

  @ApiProperty()
  @IsUUID()
  product_type_id: string;

  @ApiProperty()
  @IsUUID()
  store_id: string;

  @ApiProperty()
  @IsUUID()
  user_id?: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  status: number;
}
