import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BannersResDto } from './banners-res.dto';

export class BannerUploadFileResDto {
  @ApiProperty()
  banner: BannersResDto;

  @ApiProperty()
  @IsString()
  message: string;
}
