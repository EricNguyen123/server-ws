import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ActiveStorageUploadFileDto {
  @ApiProperty()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsString()
  key?: string;
}
