interface SendDto {
  template: string;
  data: object;
  recepient: string;
}

export class MailService {
  async send({ template, data, recepient }: SendDto) {
    // tslint:disable-next-line
    console.log('Sending email', { template, data, recepient });
  }
}
