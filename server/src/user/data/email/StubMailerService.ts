import { MailerService } from '../../domain/abstract/MailerService';

export class StubMailerService extends MailerService {
  public async send(): Promise<void> {}
}
