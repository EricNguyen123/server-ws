import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FileDto } from './files-res.dto';
import { BannersResDto } from './banners-res.dto';

export class BannersGetFilesResResDto {
  @ApiProperty()
  banner: BannersResDto;

  @ApiProperty({ type: [FileDto] })
  @ValidateNested({ each: true })
  @Type(() => FileDto)
  files: FileDto[];
}
