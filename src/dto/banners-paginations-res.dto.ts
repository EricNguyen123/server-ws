import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BannersGetFilesResResDto } from './banners-get-files-res.dto';

export class BannersPaginationResDto {
  @ApiProperty({ type: [BannersGetFilesResResDto] })
  @ValidateNested({ each: true })
  @Type(() => BannersGetFilesResResDto)
  banners: BannersGetFilesResResDto[];

  @ApiProperty()
  totalBanners: number;

  @ApiProperty()
  currentPage: number;
}
