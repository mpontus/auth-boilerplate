import { UserNotFoundError } from '../exception/UserNotFoundError';
import { Token } from '../model/Token';
import { UserService } from './UserService';

const userRepository = {
  findByEmail: jest.fn(),
};

const tokenRepository = {
  create: jest.fn(),
};

const mailerService = {
  send: jest.fn(),
};

const userService = new UserService(
  userRepository,
  tokenRepository,
  mailerService,
);

describe('password recovery', () => {
  describe('when user is not found', () => {
    beforeEach(() => {
      userRepository.findByEmail.mockResolvedValueOnce(null);
    });

    it('should throw UserNotFound Error', async () => {
      await expect(
        userService.recoverPassword('dillondelacruz@shaw.com'),
      ).rejects.toThrow(UserNotFoundError);
    });
  });

  describe('when the user exists', () => {
    const email = 'dillondelacruz@shaw.com';
    const token = 'FW9%!nRe$M';

    beforeEach(async () => {
      tokenRepository.create.mockResolvedValueOnce(
        new Token({
          token,
        }),
      );

      await userService.recoverPassword(email);
    });

    it('should persist new password recovery request', () => {
      expect(tokenRepository.create).toHaveBeenCalledWith(
        `password_reset:${email}`,
      );
    });

    it("should dispatch a notification to user's email", () => {
      expect(mailerService.send).toHaveBeenCalledWith(
        email,
        'password_recovery',
        {
          email,
          token,
        },
      );
    });
  });
});
