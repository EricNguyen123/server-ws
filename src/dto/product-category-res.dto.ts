import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { CategoriesResDto } from './categories-res.dto';
import { ProductsResDto } from './products-res.dto';

export class ProductCategoryResDto {
  @ApiProperty({ type: CategoriesResDto })
  category: CategoriesResDto;

  @ApiProperty({ type: ProductsResDto })
  product: ProductsResDto;

  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDate()
  createdDate: Date;

  @ApiProperty()
  @IsDate()
  updatedDate: Date;
}
