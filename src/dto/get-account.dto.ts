import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetAccountDto {
  @ApiProperty({ description: 'id' })
  @IsString()
  id?: string;
}
