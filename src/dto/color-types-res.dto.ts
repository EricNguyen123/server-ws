import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ColorTypesResDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  color_code: string;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;
}
