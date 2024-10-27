import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CampaignResDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  campaign_type: number;

  @ApiProperty()
  bought_count: number;

  @ApiProperty()
  promotion_count: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  end_date: Date;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;
}
