import * as nodemailer from 'nodemailer';
import EmailTemplate from 'email-templates';
import { Module } from '@nestjs/common';
import { MailerController } from './MailerController';
import { MailerService } from './MailerService';
import { ConfigService } from 'nestjs-config';

@Module({
  controllers: [MailerController],
  providers: [
    {
      provide: 'EmailTemplates',
      useFactory: (config: ConfigService) =>
        new EmailTemplate({
          message: {
            from: config.get('app.email_sender'),
          },
          send: true,
          transport: nodemailer.createTransport(config.get('env.smtp_url')),
          views: {
            options: {
              extension: 'ejs',
            },
          },
        }),
      inject: [ConfigService],
    },
    MailerService,
  ],
})
export class MailerModule {}
