import { IsEmail } from 'class-validator';

export class SendMailReqDto {
  name?: string;

  @IsEmail()
  email: string;
}
