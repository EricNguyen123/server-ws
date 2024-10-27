import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProductTypesResDto } from './product-types-res.dto';
import { IsString } from 'class-validator';
import { ProductsResDto } from './products-res.dto';
import { StoresResDto } from './stores-res.dto';
import { CampaignResDto } from './campaigns-res.dto';
import { UserResDto } from './user-res.dto';

export class CartItemsResDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: ProductTypesResDto })
  @Type(() => ProductTypesResDto)
  productType: ProductTypesResDto;

  @ApiProperty({ type: ProductsResDto })
  @Type(() => ProductsResDto)
  product: ProductsResDto;

  @ApiProperty({ type: StoresResDto })
  @Type(() => StoresResDto)
  store: StoresResDto;

  @ApiProperty({ type: UserResDto })
  @Type(() => UserResDto)
  user: UserResDto;

  @ApiProperty({ type: CampaignResDto })
  @Type(() => CampaignResDto)
  campaign: CampaignResDto;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  status: number;

  @ApiProperty()
  createdDate?: Date;

  @ApiProperty()
  updatedDate?: Date;
}
