import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetCategoryIdDto {
  @ApiProperty({ description: 'categotyId' })
  @IsString()
  categotyId?: string;
}
