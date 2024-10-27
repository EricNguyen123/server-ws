import { ApiProperty } from '@nestjs/swagger';
import { SizeTypes } from 'src/common/enums/size-types.enum';

export class SizeTypesDto {
  @ApiProperty()
  size_code: string;

  @ApiProperty()
  size_type: SizeTypes;
}
