import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { ShippingInstructionsResDto } from './shipping-instructions-res.dto';
import { UserResDto } from './user-res.dto';

export class ShippingMakerManagersResDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: () => ShippingInstructionsResDto })
  @Type(() => ShippingInstructionsResDto)
  shippingInstruction: ShippingInstructionsResDto;

  @ApiProperty({ type: () => UserResDto })
  @Type(() => UserResDto)
  user: UserResDto;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;
}
