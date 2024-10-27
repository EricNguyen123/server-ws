import { ApiProperty } from '@nestjs/swagger';

export class ProductTypeResourcesDto {
  @ApiProperty()
  productTypeId: string;

  @ApiProperty()
  productResourceId: string;

  @ApiProperty()
  quantity: number;
}
