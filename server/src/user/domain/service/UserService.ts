import { Inject } from '@nestjs/common';
import { UserRepository } from '../abstract/UserRepository';
import { SessionRepository } from '../abstract/SessionRepository';
import { TokenRepository } from '../abstract/TokenRepository';
import { MailerService } from '../abstract/MailerService';
import { PasswordHasher } from '../abstract/PasswordHasher';
import { User } from '../model/User';
import { UserNotFoundError } from '../exception/UserNotFoundError';
import { InvalidTokenError } from '../exception/InvalidTokenError';
import { UserAlreadyExistsError } from '../exception/UserAlreadyExistsError';
import { BadCredentialsError } from '../exception/BadCredentialsError';

export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(SessionRepository)
    private readonly sessionRepository: SessionRepository,
    @Inject(TokenRepository) private readonly tokenRepository: TokenRepository,
    @Inject(MailerService) private readonly mailerService: MailerService,
    @Inject(PasswordHasher) private readonly passwordHasher: PasswordHasher,
  ) {}

  public async signup(name: string, email: string, password: string) {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await this.passwordHasher.hash(password);

    const user = new User({
      name,
      email,
      passwordHash,
    });

    await this.userRepository.save(user);

    return await this.sessionRepository.create(user);
  }

  public async login(email: string, password: string) {
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

  public async logout(token: string) {
    this.sessionRepository.destroy(token);
  }

  public async authenticate(token: string) {
    const session = await this.sessionRepository.find(token);

    if (!session) {
      throw new BadCredentialsError();
    }

    return session.user;
  }

  public async recoverPassword(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (user === null) {
      throw new UserNotFoundError();
    }

    const token = await this.tokenRepository.create(`password_reset:${email}`);

    await this.mailerService.send(email, 'password_recovery', {
      email,
      token: token.token,
    });
  }

  public async resetPassword(
    email: string,
    token: string,
    password: string,
  ): Promise<void> {
    const validToken = await this.tokenRepository.claim(
      `password_reset:${email}`,
      token,
    );

    if (!validToken) {
      throw new InvalidTokenError();
    }

    const user = await this.userRepository.findByEmail(email);

    user.passwordHash = await this.passwordHasher.hash(password);

    await this.userRepository.save(user);
  }
}
