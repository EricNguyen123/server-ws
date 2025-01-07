import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, ValidateIf } from 'class-validator';

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

  @ApiProperty({ required: false })
  @ValidateIf((obj) => obj.url !== undefined)
  @IsUrl()
  url?: string;
}
