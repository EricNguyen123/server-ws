import { ApiProperty } from '@nestjs/swagger';

export class ProductTypesDto {
  @ApiProperty()
  colorTypeId: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  sizeTypeId: string;

  @ApiProperty()
  quantity: number;
}
