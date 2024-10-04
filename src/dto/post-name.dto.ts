import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostNameDto {
  @ApiProperty()
  @IsString()
  name?: string;
}
