import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { envs } from 'src/config/envs';
import { SendMailDto } from 'src/dto/send-mail.dto';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}
  mailTransport() {
    const transporter = nodemailer.createTransport({
      host: envs.mailHost,
      port: envs.mailPort,
      secure: false,
      auth: {
        user: envs.mailUsername,
        pass: envs.mailPassword,
      },
    });
    return transporter;
  }

  async sendMail(sendMailDto: SendMailDto) {
    const { from, recipients, subject, html } = sendMailDto;
    const transport = this.mailTransport();

    const mailOptions: Mail.Options = {
      from: from ?? {
        name: envs.appName,
        address: envs.mailFromAddress,
      },
      to: recipients,
      subject,
      html,
    };
    try {
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
