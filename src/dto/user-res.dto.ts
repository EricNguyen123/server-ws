import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserResDto {
  @ApiProperty()
  @IsString()
  id?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  role?: number;

  @ApiProperty()
  status?: number;

  @ApiProperty()
  zipcode?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  prefecture?: string;

  @ApiProperty()
  city?: string;

  @ApiProperty()
  street?: string;

  @ApiProperty()
  building?: string;

  @ApiProperty()
  tokens?: string;

  @ApiProperty()
  createdDate?: Date;

  @ApiProperty()
  updatedDate?: Date;
}
