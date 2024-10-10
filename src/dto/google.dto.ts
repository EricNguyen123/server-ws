import { IsEmail, IsString } from 'class-validator';

export class GoogleDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  encrypted_password: string;

  status: number;
}
