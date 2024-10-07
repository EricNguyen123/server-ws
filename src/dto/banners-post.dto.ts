import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class BannersPostDto {
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
}
