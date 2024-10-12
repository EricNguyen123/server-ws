import { ApiProperty } from '@nestjs/swagger';

export class ProductResourceDto {
  @ApiProperty()
  resourceId: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  quantity?: number;

  @ApiProperty()
  resource_type?: string;
}
