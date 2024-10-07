import { ApiProperty } from '@nestjs/swagger';

export class CategoriesDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  parentCategoryId?: string | null;
}
