import * as nodemailer from 'nodemailer';
import Mail from 'email-templates';
import { Module } from '@nestjs/common';
import { MailerController } from './MailerController';
import { MailerService } from './MailerService';

@Module({
  controllers: [MailerController],
  providers: [
    {
      provide: MailerService,
      useValue: new MailerService(
        new Mail({
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
      ),
    },
  ],
})
export class MailerModule {}
