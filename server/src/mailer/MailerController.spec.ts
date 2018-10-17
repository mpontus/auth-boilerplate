import { MailerController } from "./MailerController";
import { MailerService } from "./MailerService";

const mailer = {
  send: jest.fn(),
};

const mailerService = new MailerService(mailer as any);
const controller = new MailerController(mailerService);

describe("MailerController", () => {
  const recipient = "curtischarles@diaz-brown.com";
  const template = "password_recovery";
  const data = {
    action_url: "https://example.org/",
  };

  describe("send", () => {
    beforeEach(async () => {
      await controller.send({
        recipient,
        template,
        data,
      });
    });

    it("should send the email to the given recepient", () => {
      expect(mailer.send).toHaveBeenCalledWith({
        template: expect.stringMatching(new RegExp(`${template}$`)),
        message: {
          to: recipient,
        },
        locals: data,
      });
    });
  });
});
