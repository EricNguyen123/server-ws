import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, ValidateNested, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { MediaItemDto } from './media-items-res.dto';
import { FileDto } from './files-res.dto';

export class BannersGetFilesResResDto {
  @ApiProperty()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsString()
  descriptions: string;

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  end_date: Date;

  @ApiProperty()
  number_order: number;

  @ApiProperty()
  @IsUrl()
  url: string;

  @ApiProperty()
  @IsDate()
  createdDate: Date;

  @ApiProperty()
  @IsDate()
  updatedDate: Date;

  @ApiProperty({ type: [MediaItemDto] })
  @ValidateNested({ each: true })
  @Type(() => MediaItemDto)
  mediaItems: MediaItemDto[];

  @ApiProperty({ type: [FileDto] })
  @ValidateNested({ each: true })
  @Type(() => FileDto)
  files: FileDto[];
}
