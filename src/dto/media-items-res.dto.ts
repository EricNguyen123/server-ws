import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ActiveStorageAttachmentDto } from './active-storage-attachments-res.dto';

export class MediaItemDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  resource_type: string;

  @ApiProperty()
  @IsNumber()
  media_type: number;

  @ApiProperty()
  @IsString()
  media_url: string;

  @ApiProperty({ type: [ActiveStorageAttachmentDto] })
  @ValidateNested({ each: true })
  @Type(() => ActiveStorageAttachmentDto)
  activeStorageAttachments: ActiveStorageAttachmentDto[];

  @ApiProperty()
  @IsDate()
  createdDate: Date;

  @ApiProperty()
  @IsDate()
  updatedDate: Date;
}
