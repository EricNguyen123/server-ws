import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class VerifyOTPResDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  status: number;
}
