import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import EmailTemplate from 'email-templates';
import { ConfigService } from 'nestjs-config';
import * as nodemailer from 'nodemailer';
import { commandHandlers } from './command/handler';
import { MailerService } from './mailer.service';

/**
 * Mailer module
 *
 * Responsible for building email contents from templates and allowing
 * other modules to defer email delivery.
 */
@Module({
  imports: [CQRSModule],
  providers: [
    {
      provide: 'EmailTemplates',
      useFactory: (config: ConfigService): EmailTemplate =>
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
    ...commandHandlers,
  ],
})
export class MailerModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly command$: CommandBus,
    private readonly event$: EventBus,
  ) {}

  public onModuleInit(): void {
    this.command$.setModuleRef(this.moduleRef);
    this.event$.setModuleRef(this.moduleRef);

    this.command$.register(commandHandlers);
  }
}
