import { ApiProperty } from '@nestjs/swagger';

export class PostCategoryProductDto {
  @ApiProperty({ description: 'array category id' })
  categoryIds: string[];

  @ApiProperty({ description: 'array product id' })
  productIds: string[];
}
