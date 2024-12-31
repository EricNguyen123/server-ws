import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoriesResDto } from './categories-res.dto';

export class CategoriesPaginationResDto {
  @ApiProperty({ type: [CategoriesResDto] })
  @ValidateNested({ each: true })
  @Type(() => CategoriesResDto)
  categories: CategoriesResDto[];

  @ApiProperty()
  totalCategories: number;

  @ApiProperty()
  currentPage: number;
}
