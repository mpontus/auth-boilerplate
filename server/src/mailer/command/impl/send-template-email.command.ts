import { ICommand } from '@nestjs/cqrs';

/**
 * Command for sending email using predefined template
 */
export class SendTemplateEmailCommand implements ICommand {
  constructor(
    recipient: string,
    template: 'password_recovery' | 'email_activation',
    locals: {
      recipient_name: string;
      action_url: string;
    },
  );

  constructor(
    public readonly recipient: string,
    public readonly template: string,
    public readonly locals: object,
  ) {}
}
