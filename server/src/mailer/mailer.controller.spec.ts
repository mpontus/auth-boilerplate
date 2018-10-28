import * as EmailTemplates from 'email-templates';
import { ConfigService } from 'nestjs-config';
import * as TypeMoq from 'typemoq';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';

const mailerMock = TypeMoq.Mock.ofType<EmailTemplates>(
  undefined,
  TypeMoq.MockBehavior.Strict,
);

const configMock = TypeMoq.Mock.ofType<ConfigService>(
  undefined,
  TypeMoq.MockBehavior.Strict,
);

const mailerService = new MailerService(mailerMock.object, configMock.object);
const controller = new MailerController(mailerService);

describe('MailerController', () => {
  const recipient = 'curtischarles@diaz-brown.com';
  const template = 'password_recovery';
  const locals = {
    recipient_name: 'Brian Foster',
    token: '_q*9s^Li$G',
  };

  describe('send', () => {
    beforeEach(() => {
      configMock
        .setup(x => x.get('app.site_url'))
        .returns(() => 'http://example.org/');
      configMock
        .setup(x => x.get('app.site_name'))
        .returns(() => 'Website Name');

      mailerMock
        .setup(x =>
          x.send(
            TypeMoq.It.is(arg => {
              expect(arg).toEqual({
                template: expect.stringMatching(new RegExp(`${template}$`)),
                message: {
                  to: recipient,
                },
                locals: {
                  recipient_name: 'Brian Foster',
                  token: '_q*9s^Li$G',
                  site_name: 'Website Name',
                  site_url: 'http://example.org/',
                },
              });

              return true;
            }),
          ),
        )
        .returns(() => undefined)
        .verifiable(TypeMoq.Times.once());
    });

    beforeEach(async () => {
      await controller.send({
        recipient,
        template,
        locals,
      });
    });

    it('should send the email to the provided recepient', () => {
      mailerMock.verifyAll();
    });
  });
});
