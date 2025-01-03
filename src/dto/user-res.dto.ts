import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Status } from 'src/common/enums/status.enum';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';

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
  createdDate?: Date;

  @ApiProperty()
  updatedDate?: Date;
}
