import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate } from 'class-validator';

export class ActiveStorageBlobDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsString()
  filename: string;

  @ApiProperty()
  @IsString()
  content_type: string;

  @ApiProperty()
  @IsString()
  metadata: string;

  @ApiProperty()
  @IsNumber()
  byte_size: number;

  @ApiProperty()
  @IsString()
  checksum: string;

  @ApiProperty()
  @IsDate()
  createdDate: Date;

  @ApiProperty()
  @IsDate()
  updatedDate: Date;
}
