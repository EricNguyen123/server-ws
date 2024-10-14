import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class StorePrefecturesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  prefecture_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  store_id: string;

  @ApiProperty()
  @IsNotEmpty()
  shipping_fee: number;
}
