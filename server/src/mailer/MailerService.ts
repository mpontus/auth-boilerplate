import * as EmailTemplate from 'email-templates';

export class MailerService {
  constructor(private readonly client: EmailTemplate) {}

  async send(recipient: string, template: string, locals: object) {
    return await this.client.send({
      template: `${__dirname}/templates/${template}`,
      message: {
        to: recipient,
      },
      locals,
    });
  }
}
