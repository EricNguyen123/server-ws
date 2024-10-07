import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUrl } from 'class-validator';

export class ShippingCompanyDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  url?: string;

  @ApiProperty()
  memo?: string;
}
