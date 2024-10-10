import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendMailReqDto } from 'src/dto/send-mail-req.dto';
import { SendMailDto } from 'src/dto/send-mail.dto';
import { envs } from 'src/config/envs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('mailer')
@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  sendMail(@Body() sendMailReqDto: SendMailReqDto) {
    const dto: SendMailDto = {
      from: { name: envs.appName, address: envs.mailFromAddress },
      recipients: [
        { name: sendMailReqDto.name, address: sendMailReqDto.email },
      ],
      subject: 'Welcome to WebShop',
      html: `<p>
        <strong>Hi ${sendMailReqDto.name}!</strong>
      </p>`,
    };
    return this.mailerService.sendMail(dto);
  }
}
