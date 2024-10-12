import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteStoresResDto {
  @ApiProperty()
  status?: number;

  @ApiProperty()
  @IsString()
  message?: string;
}
