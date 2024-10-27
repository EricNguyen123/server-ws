import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { SizeTypes } from 'src/common/enums/size-types.enum';

export class SizeTypesResDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  size_code: string;

  @ApiProperty()
  size_type: SizeTypes;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;
}
