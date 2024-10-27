import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProductTypesResDto } from './product-types-res.dto';
import { ProductResourceResDto } from './product-resource-res.dto';
import { IsString } from 'class-validator';

export class ProductTypeResourcesResDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: ProductTypesResDto })
  @Type(() => ProductTypesResDto)
  productType: ProductTypesResDto;

  @ApiProperty({ type: ProductResourceResDto })
  @Type(() => ProductResourceResDto)
  productResource: ProductResourceResDto;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  createdDate?: Date;

  @ApiProperty()
  updatedDate?: Date;
}
