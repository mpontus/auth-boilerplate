interface SendDto {
  template: string;
  data: object;
  recepient: string;
}

export class MailService {
  async send({ template, data, recepient }: SendDto) {
    console.log('Sending email', { template, data, recepient });
  }
}
