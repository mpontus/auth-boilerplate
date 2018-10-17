import { Inject } from '@nestjs/common';
import * as EmailTemplates from 'email-templates';
import { ConfigService } from 'nestjs-config';

/**
 * Mailer service
 *
 * Responsible for message assembly and delivery.
 */
export class MailerService {
  constructor(
    @Inject('EmailTemplates') private readonly client: EmailTemplates,
    @Inject(ConfigService) private readonly config: ConfigService,
  ) {}

  /**
   * Assemble and deliver transactional email
   */
  public async send(
    recipient: string,
    template: string,
    locals: object,
  ): Promise<void> {
    const mergedLocals = {
      site_url: this.config.get('app.site_url'),
      site_name: this.config.get('app.site_name'),
      ...locals,
    };

    await this.client.send({
      template: `${__dirname}/templates/${template}`,
      message: {
        to: recipient,
      },
      locals: mergedLocals,
    });
  }
}
