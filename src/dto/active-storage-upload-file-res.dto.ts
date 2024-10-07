import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ActiveStorageUploadFileResDto {
  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsString()
  fileUrl: string;
}
