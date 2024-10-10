import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class VerifyMailDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  token: string;
}
