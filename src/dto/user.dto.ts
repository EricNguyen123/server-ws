import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UserDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  encrypted_password?: string;

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
