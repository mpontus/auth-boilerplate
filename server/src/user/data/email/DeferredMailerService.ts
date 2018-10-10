import { ClientProxy } from '@nestjs/microservices';
import { MailerService } from '../../domain/abstract/MailerService';

class DeferredMailerService extends MailerService {
  constructor(private readonly client: ClientProxy) {
    super();
  }

  public async send(
    email: string,
    template: string,
    data: { [key: string]: boolean | string | number },
  ): Promise<void> {
    // Subscribe but ignore the result to kick off message delivery
    // and start task in the background
    this.client
      .send({ cmd: 'send_email' }, { recepient: email, template, data })
      .subscribe();
  }
}
