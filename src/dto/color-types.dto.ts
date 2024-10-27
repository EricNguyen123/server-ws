import { ApiProperty } from '@nestjs/swagger';

export class ColorTypesDto {
  @ApiProperty()
  color_code: string;
}
