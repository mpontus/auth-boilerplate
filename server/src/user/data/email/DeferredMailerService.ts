import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MailerService } from '../../domain/abstract/MailerService';

export class DeferredMailerService extends MailerService {
  constructor(@Inject(ClientProxy) private readonly client: ClientProxy) {
    super();
  }

  public async send(
    recipient: string,
    template: string,
    data: { [key: string]: boolean | string | number },
  ): Promise<void> {
    // Subscribe but ignore the result to kick off message delivery
    // and start task in the background
    this.client
      .send({ cmd: 'send_email' }, { recipient, template, data })
      .subscribe();
  }
}
