import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailerService } from './MailerService';
import { SendDto } from './SendDto';

/**
 * Mailer controller
 *
 * Listens to a queue and sends out transactional emails.
 */
@Controller('/mail')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  /**
   * Send transactional email
   */
  @MessagePattern({ cmd: 'send_transactional_email' })
  public async send({ recipient, template, locals }: SendDto) {
    await this.mailerService.send(recipient, template, locals);
  }
}
