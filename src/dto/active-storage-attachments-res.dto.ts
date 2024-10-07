import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ActiveStorageBlobDto } from './active-storage-blobs-res.dto';

export class ActiveStorageAttachmentDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  record_type: string;

  @ApiProperty({ type: ActiveStorageBlobDto })
  @ValidateNested()
  @Type(() => ActiveStorageBlobDto)
  activeStorageBlob: ActiveStorageBlobDto;

  @ApiProperty()
  @IsDate()
  createdDate: Date;

  @ApiProperty()
  @IsDate()
  updatedDate: Date;
}
