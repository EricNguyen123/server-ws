import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteProductResourceResDto {
  @ApiProperty()
  status?: number;

  @ApiProperty()
  @IsString()
  message?: string;
}
