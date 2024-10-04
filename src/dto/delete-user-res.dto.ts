import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteUserResDto {
  @ApiProperty()
  @IsString()
  id?: string;

  @ApiProperty()
  status?: number;

  @ApiProperty()
  @IsString()
  message?: string;
}
