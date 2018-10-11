import * as nodemailer from 'nodemailer';
import EmailTemplate from 'email-templates';
import { Module } from '@nestjs/common';
import { MailerController } from './MailerController';
import { MailerService } from './MailerService';

@Module({
  controllers: [MailerController],
  providers: [
    {
      provide: 'EmailTemplates',
      useValue: new EmailTemplate({
        message: {
          from: 'foo@bar.baz',
        },
        send: true,
        transport: nodemailer.createTransport(process.env.SMTP_URL),
        views: {
          options: {
            extension: 'ejs',
          },
        },
      }),
    },
    MailerService,
  ],
})
export class MailerModule {}
