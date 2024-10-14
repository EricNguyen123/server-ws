import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { PrefecturesResDto } from './prefectures-res.dto';
import { StoresResDto } from './stores-res.dto';

export class StorePrefecturesResDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;

  @ApiProperty({ type: PrefecturesResDto })
  @Type(() => PrefecturesResDto)
  prefecture: PrefecturesResDto;

  @ApiProperty({ type: StoresResDto })
  @Type(() => StoresResDto)
  store: StoresResDto;

  @ApiProperty()
  @IsNotEmpty()
  shipping_fee: number;
}
