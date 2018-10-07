export abstract class MailerService {
  public abstract send(
    email: string,
    template: string,
    data: { [key: string]: boolean | string | number },
  ): Promise<void>;
}
