import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ProductsResDto } from './products-res.dto';
import { Type } from 'class-transformer';
import { StoresResDto } from './stores-res.dto';

export class ProductResourceResDto {
  @ApiProperty()
  @IsString()
  id?: string;

  @ApiProperty({ type: ProductsResDto })
  @Type(() => ProductsResDto)
  product: ProductsResDto;

  @ApiProperty({ type: StoresResDto })
  @Type(() => StoresResDto)
  store: StoresResDto;

  @ApiProperty()
  quantity?: number;

  @ApiProperty()
  resource_type?: string;

  @ApiProperty()
  createdDate?: Date;

  @ApiProperty()
  updatedDate?: Date;
}
