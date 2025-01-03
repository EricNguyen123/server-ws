import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, ValidateIf } from 'class-validator';
import { Status } from 'src/common/enums/status.enum';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';

export class UserDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @ValidateIf((obj) => obj.encrypted_password !== undefined)
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  encrypted_password?: string;

  @ApiProperty()
  role?: ValidRoles;

  @ApiProperty()
  status?: Status;

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
  current_sign_in_at?: Date;

  @ApiProperty()
  last_sign_in_at?: Date;

  @ApiProperty()
  tokens?: string;
}
