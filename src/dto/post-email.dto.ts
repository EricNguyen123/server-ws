import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostEmailDto {
  @ApiProperty()
  @IsString()
  email?: string;
}
