import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { UserResDto } from './user-res.dto';
import { OrderItemsResDto } from './order-items-res.dto';

export class OrdersResDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: UserResDto })
  @Type(() => UserResDto)
  orderer: UserResDto;

  @ApiProperty()
  orderer_type: string;

  @ApiProperty({ type: UserResDto })
  @Type(() => UserResDto)
  receiver: UserResDto;

  @ApiProperty()
  receiver_type: string;

  @ApiProperty()
  order_status: number;

  @ApiProperty()
  shipping_status: number;

  @ApiProperty()
  order_id: string;

  @ApiProperty()
  order_date: Date;

  @ApiProperty()
  order_at: Date;

  @ApiProperty()
  memo: string;

  @ApiProperty()
  order_type: number;

  @ApiProperty({ type: UserResDto })
  @Type(() => UserResDto)
  user: UserResDto;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;

  @ApiProperty({ type: () => [OrderItemsResDto] })
  @ValidateNested({ each: true })
  @Type(() => OrderItemsResDto)
  orderItems?: OrderItemsResDto[];
}
