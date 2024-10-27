import { ApiProperty } from '@nestjs/swagger';

export class CampaignDto {
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
}
