import { Inject } from '@nestjs/common';
import { UserRepository } from '../abstract/UserRepository';
import { SessionRepository } from '../abstract/SessionRepository';
import { PasswordRecoveryRepository } from '../abstract/PasswordRecoveryRepository';
import { MailerService } from '../abstract/MailerService';
import { PasswordHasher } from '../abstract/PasswordHasher';
import { User } from '../model/User';
import { Session } from '../model/Session';
import { PasswordRecovery } from '../model/PasswordRecovery';
import { UserNotFoundError } from '../exception/UserNotFoundError';
import { InvalidTokenError } from '../exception/InvalidTokenError';
import { UserAlreadyExistsError } from '../exception/UserAlreadyExistsError';
import { BadCredentialsError } from '../exception/BadCredentialsError';

export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(SessionRepository)
    private readonly sessionRepository: SessionRepository,
    @Inject(PasswordRecoveryRepository)
    private readonly passwordRecoveryRepository: PasswordRecoveryRepository,
    @Inject(MailerService) private readonly mailerService: MailerService,
    @Inject(PasswordHasher) private readonly passwordHasher: PasswordHasher,
  ) {}

  public async signup(
    name: string,
    email: string,
    password: string,
  ): Promise<Session> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await this.passwordHasher.hash(password);

    const user = await this.userRepository.save(
      new User({
        name,
        email,
        passwordHash,
      }),
    );

    return await this.sessionRepository.create(user);
  }

  public async login(email: string, password: string): Promise<Session> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadCredentialsError();
    }

    const isValid = this.passwordHasher.verify(password, user.passwordHash);

    if (!isValid) {
      throw new BadCredentialsError();
    }

    return this.sessionRepository.create(user);
  }

  public logout(token: string): Promise<Session> {
    return this.sessionRepository.destroy(token);
  }

  public async authenticate(token: string): Promise<User> {
    const session = await this.sessionRepository.find(token);

    if (!session) {
      throw new BadCredentialsError();
    }

    return session.user;
  }

  public async recoverPassword(email: string): Promise<PasswordRecovery> {
    const user = await this.userRepository.findByEmail(email);

    if (user === null) {
      throw new UserNotFoundError();
    }

    const request = await this.passwordRecoveryRepository.create(user);

    await this.mailerService.send(email, 'password_recovery', {
      email,
      token: request.token,
    });

    return request;
  }

  public async resetPassword(
    token: string,
    password: string,
  ): Promise<PasswordRecovery> {
    const request = await this.passwordRecoveryRepository.find(token);

    if (!request) {
      throw new InvalidTokenError();
    }

    const user = request.user;

    user.passwordHash = await this.passwordHasher.hash(password);

    await this.userRepository.save(user);

    return this.passwordRecoveryRepository.destroy(token);
  }
}
