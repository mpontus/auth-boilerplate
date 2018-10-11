import { Inject } from '@nestjs/common';
import * as EmailTemplates from 'email-templates';
import { ConfigService } from 'nestjs-config';

export class MailerService {
  constructor(
    @Inject('EmailTemplates') private readonly client: EmailTemplates,
    @Inject(ConfigService) private readonly config: ConfigService,
  ) {}

  async send(recipient: string, template: string, locals: object) {
    const mergedLocals = {
      site_url: this.config.get('app.site_url'),
      site_name: this.config.get('app.site_name'),
      ...locals,
    };

    return await this.client.send({
      template: `${__dirname}/templates/${template}`,
      message: {
        to: recipient,
      },
      locals: mergedLocals,
    });
  }
}
