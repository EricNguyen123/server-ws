import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteItemResDto {
  @ApiProperty()
  status?: number;

  @ApiProperty()
  @IsString()
  message?: string;
}
