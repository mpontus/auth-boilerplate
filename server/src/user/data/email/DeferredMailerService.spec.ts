import { DeferredMailerService } from './DeferredMailerService';

const client = {
  send: jest.fn(),
};

const stream = {
  subscribe: jest.fn(),
};

client.send.mockReturnValue(stream);

const mailerService = new DeferredMailerService(client as any);

describe('DeferredMailerService.ts', () => {
  const recipient = 'kmartinez@wright.com';
  const template = 'password_recovery';
  const data = {
    action_url: 'http://www.moore-jones.com/',
  };

  beforeEach(async () => {
    await mailerService.send(recipient, template, data);
  });

  it("should dispatch 'send' message", () => {
    expect(client.send).toHaveBeenCalledWith(
      { cmd: 'send_email' },
      { recipient, template, data },
    );
    expect(stream.subscribe).toHaveBeenCalled();
  });
});
