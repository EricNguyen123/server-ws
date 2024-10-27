import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ShippingMakerManagersDto {
  @ApiProperty()
  @IsUUID()
  shipping_instruction_id: string;

  @ApiProperty()
  @IsUUID()
  user_id: string;
}
