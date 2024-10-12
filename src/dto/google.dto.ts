import { IsEmail, IsString } from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

export class GoogleDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  encrypted_password: string;

  @IsString()
  provider: string;

  @IsString()
  uid: string;

  status: Status;
}
