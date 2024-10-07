import { ApiProperty } from '@nestjs/swagger';

export class BannersDto {
  @ApiProperty()
  number_order: number;
}
