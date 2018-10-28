import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MailerService } from 'mailer/mailer.service';
import { SendTemplateEmailCommand } from '../impl/send-template-email.command';

/**
 * Handle SendTemplateEmailCommand
 *
 * Sends the email using specified template without blocking the
 * request cycle.
 */

@CommandHandler(SendTemplateEmailCommand)
export class SendTemplateEmailHandler
  implements ICommandHandler<SendTemplateEmailCommand> {
  constructor(private readonly mailerService: MailerService) {}

  public async execute(
    command: SendTemplateEmailCommand,
    resolve: () => void,
  ): Promise<void> {
    resolve();

    await this.mailerService.send(
      command.recipient,
      command.template,
      command.locals,
    );
  }
}
