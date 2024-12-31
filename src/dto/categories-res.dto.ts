import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

export class CategoriesResDto {
  @ApiProperty()
  @IsString()
  id?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  parentCategory?: CategoriesResDto;

  @ApiProperty({ type: [CategoriesResDto] })
  @ValidateNested({ each: true })
  @Type(() => CategoriesResDto)
  subCategories?: CategoriesResDto[];

  @ApiProperty()
  createdDate?: Date;

  @ApiProperty()
  updatedDate?: Date;
}
