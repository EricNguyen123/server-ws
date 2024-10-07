import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CategoriesResDto {
  @ApiProperty()
  @IsString()
  id?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  parentCategoryId?: string | null;

  @ApiProperty()
  createdDate?: Date;

  @ApiProperty()
  updatedDate?: Date;
}
