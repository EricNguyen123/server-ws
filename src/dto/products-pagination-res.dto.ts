import { ApiProperty } from '@nestjs/swagger';
import { ProductsResDto } from './products-res.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductsPaginationResDto {
  @ApiProperty({ type: [ProductsResDto] })
  @ValidateNested({ each: true })
  @Type(() => ProductsResDto)
  products: ProductsResDto[];

  @ApiProperty()
  totalProducts: number;

  @ApiProperty()
  currentPage: number;
}
