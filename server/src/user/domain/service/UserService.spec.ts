import { UserNotFoundError } from '../exception/UserNotFoundError';
import { InvalidTokenError } from '../exception/InvalidTokenError';
import { Token } from '../model/Token';
import { User } from '../model/User';
import { UserService } from './UserService';

const userRepository = {
  findByEmail: jest.fn(),
  save: jest.fn(),
};

const tokenRepository = {
  create: jest.fn(),
  claim: jest.fn(),
};

const mailerService = {
  send: jest.fn(),
};

const passwordHasher = {
  hash: jest.fn(),
  verify: jest.fn(),
};

const userService = new UserService(
  userRepository,
  tokenRepository,
  mailerService,
  passwordHasher,
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

    it('should dispatch a notification to user email', () => {
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

describe('password reset', () => {
  const email = 'nwashington@gmail.com';
  const token = 'x6tnBEr4&i';
  const password = '_q*9s^Li$G';
  const passwordHash = '^u&Mt3&I52';
  const user = new User({
    email,
  });

  describe('when the token is invalid', () => {
    beforeEach(() => {
      tokenRepository.claim.mockResolvedValueOnce(false);
    });

    it('must throw an error', async () => {
      await expect(
        userService.resetPassword(email, token, password),
      ).rejects.toThrow(InvalidTokenError);
    });
  });

  describe('when the token is valid', () => {
    beforeEach(() => {
      tokenRepository.claim.mockImplementationOnce((permit, token) => {
        expect(permit).toBe(`password_reset:${email}`);
        expect(token).toBe(token);

        return true;
      });

      userRepository.findByEmail.mockImplementationOnce(actual => {
        expect(actual).toBe(email);

        return user;
      });

      passwordHasher.hash.mockImplementationOnce(actual => {
        expect(actual).toBe(password);

        return passwordHash;
      });
    });

    beforeEach(async () => {
      await userService.resetPassword(email, token, password);
    });

    it('must write the user to the database', () => {
      expect(userRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          email,
          passwordHash,
        }),
      );
    });
  });
});
