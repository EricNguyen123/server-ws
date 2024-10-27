import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { ColorTypesResDto } from './color-types-res.dto';
import { ProductsResDto } from './products-res.dto';
import { SizeTypesResDto } from './size-types-res.dto';

export class ProductTypesResDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: ColorTypesResDto })
  @Type(() => ColorTypesResDto)
  colorType: ColorTypesResDto;

  @ApiProperty({ type: ProductsResDto })
  @Type(() => ProductsResDto)
  product: ProductsResDto;

  @ApiProperty({ type: SizeTypesResDto })
  @Type(() => SizeTypesResDto)
  sizeType: SizeTypesResDto;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  createdDate?: Date;

  @ApiProperty()
  updatedDate?: Date;
}
