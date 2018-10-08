import { Token } from '../model/Token';
import { User } from '../model/User';
import { UserNotFoundError } from '../exception/UserNotFoundError';
import { InvalidTokenError } from '../exception/InvalidTokenError';
import { UserAlreadyExistsError } from '../exception/UserAlreadyExistsError';
import { BadCredentialsError } from '../exception/BadCredentialsError';
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

const sessionRepository = {
  find: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
};

const userService = new UserService(
  userRepository,
  sessionRepository,
  tokenRepository,
  mailerService,
  passwordHasher,
);

afterEach(() => {
  jest.resetAllMocks();
});

describe('signup', () => {
  const name = 'Brian Foster';
  const email = 'ebrown@hotmail.com';
  const password = '_q*9s^Li$G';
  const passwordHash = 'FW9%!nRe$M';
  const token = 'x6tnBEr4&i';
  const user = expect.objectContaining({
    name,
    email,
    passwordHash,
  });

  describe('when user already exists', () => {
    beforeEach(() => {
      userRepository.findByEmail.mockImplementationOnce(actual => {
        expect(actual).toBe(email);

        return {};
      });
    });

    it('should throw an error', async () => {
      await expect(userService.signup(name, email, password)).rejects.toThrow(
        UserAlreadyExistsError,
      );
    });
  });

  describe('when details are valid', () => {
    beforeEach(() => {
      passwordHasher.hash.mockImplementationOnce(actual => {
        expect(actual).toBe(password);

        return passwordHash;
      });

      sessionRepository.create.mockImplementationOnce(actual => {
        expect(actual).toEqual(user);

        return {
          token,
          user,
        };
      });
    });

    let result: any;

    beforeEach(async () => {
      result = await userService.signup(name, email, password);
    });

    it('should save the user to the database', () => {
      expect(userRepository.save).toHaveBeenCalledWith(user);
    });

    it('should return a session', async () => {
      expect(result).toMatchObject({
        token,
        user,
      });
    });
  });
});

describe('login', () => {
  const email = 'ebrown@hotmail.com';
  const password = '_q*9s^Li$G';
  const passwordHash = 'ngbA1CVl!H';

  describe('when user does not exist', () => {
    beforeEach(() => {
      userRepository.findByEmail.mockImplementationOnce(actual => {
        expect(actual).toBe(email);

        return null;
      });
    });

    it('should throw an error', async () => {
      await expect(userService.login(email, password)).rejects.toThrow(
        BadCredentialsError,
      );
    });
  });

  describe('when password does not match', () => {
    beforeEach(() => {
      userRepository.findByEmail.mockImplementationOnce(actual => {
        expect(actual).toBe(email);

        return new User({
          passwordHash,
        });
      });

      passwordHasher.verify.mockImplementationOnce(
        (actualPassword, actualPasswordHash) => {
          expect(actualPasswordHash).toEqual(passwordHash);
          expect(actualPassword).toEqual(password);

          return false;
        },
      );
    });

    it('should throw an error', async () => {
      await expect(userService.login(email, password)).rejects.toThrow(
        BadCredentialsError,
      );
    });
  });

  describe('when password matches', () => {
    const user = new User({
      passwordHash,
    });
    const session = {};

    beforeEach(() => {
      userRepository.findByEmail.mockImplementationOnce(actual => {
        expect(actual).toBe(email);

        return user;
      });

      passwordHasher.verify.mockImplementationOnce(
        (actualPassword, actualPasswordHash) => {
          expect(actualPasswordHash).toEqual(passwordHash);
          expect(actualPassword).toEqual(password);

          return true;
        },
      );

      sessionRepository.create.mockImplementationOnce(actual => {
        expect(actual).toBe(user);

        return session;
      });
    });

    it('should return a session', async () => {
      await expect(userService.login(email, password)).resolves.toBe(session);
    });
  });
});

describe('logout', () => {
  const token = '2$_5PHMeGU';
  const session = { destroyed: true };

  beforeEach(() => {
    sessionRepository.destroy.mockImplementationOnce(actual => {
      expect(actual).toBe(token);

      return session;
    });
  });

  let result: any;

  beforeEach(async () => {
    result = await userService.logout(token);
  });

  it('should delete the session', () => {
    expect(sessionRepository.destroy).toHaveBeenCalledWith(token);
  });

  it('should return the session object', () => {
    expect(result).toEqual(session);
  });
});

describe('authenticate', () => {
  const token = 'H$4Dxli4R8';

  describe('when session does not exist', () => {
    beforeEach(() => {
      sessionRepository.find.mockImplementationOnce(expected => {
        expect(expected).toBe(token);

        return null;
      });
    });

    it('should throw an error', () => {
      expect(userService.authenticate(token)).rejects.toThrow(
        BadCredentialsError,
      );
    });
  });

  describe('when session exists', () => {
    const user = {};

    beforeEach(() => {
      sessionRepository.find.mockImplementationOnce(expected => {
        expect(expected).toBe(token);

        return {
          user,
        };
      });
    });

    it('should return the user', async () => {
      await expect(userService.authenticate(token)).resolves.toBe(user);
    });
  });
});

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
