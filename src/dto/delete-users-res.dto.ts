import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteUsersResDto {
  @ApiProperty({ description: 'array id' })
  ids?: string[];

  @ApiProperty()
  status?: number;

  @ApiProperty()
  @IsString()
  message?: string;
}
