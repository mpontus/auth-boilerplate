import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailerService } from './MailerService';
import { SendDto } from './SendDto';

@Controller('/mail')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern({ cmd: 'send_email' })
  async send({ recipient, template, data }: SendDto) {
    this.mailerService.send(recipient, template, data);
  }
}
