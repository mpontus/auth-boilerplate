import { Inject } from '@nestjs/common';
import { UserRepository } from '../abstract/UserRepository';
import { TokenRepository } from '../abstract/TokenRepository';
import { MailerService } from '../abstract/MailerService';
import { PasswordHasher } from '../abstract/PasswordHasher';
import { UserNotFoundError } from '../exception/UserNotFoundError';
import { InvalidTokenError } from '../exception/InvalidTokenError';

export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(TokenRepository) private readonly tokenRepository: TokenRepository,
    @Inject(MailerService) private readonly mailerService: MailerService,
    @Inject(PasswordHasher) private readonly passwordHasher: PasswordHasher,
  ) {}

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
    const token = await this.tokenRepository.claim(
      `password_reset:${email}`,
      token,
    );

    if (!validToken) {
      throw new InvalidTokenError();
    }

    const user = await this.userRepository.findByEmail(email);

    user.passwordHash = await this.passwordHasher.hash(password);

    await this.userRepository.save(user);

    return token;
  }
}
