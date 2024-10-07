import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FileDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsString()
  filename: string;

  @ApiProperty()
  @IsString()
  contentType: string;
}
