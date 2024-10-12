import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

export class StoresResDto {
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
  status?: Status;

  @ApiProperty()
  postcode?: string;

  @ApiProperty()
  prefecture?: string;

  @ApiProperty()
  city?: string;

  @ApiProperty()
  street?: string;

  @ApiProperty()
  building?: string;

  @ApiProperty()
  createdDate?: Date;

  @ApiProperty()
  updatedDate?: Date;
}
