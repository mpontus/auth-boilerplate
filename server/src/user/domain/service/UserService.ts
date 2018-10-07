import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';
import { MailService } from './MailService';
import { UserRepository } from '../../data/user/UserRepository';
import { TokenRepository } from '../../data/token/TokenRepository';
import { User } from '../model/User';
import { SignupDto } from '../model/SignupDto';
import { SocialLoginDto } from '../model/SocialLoginDto';
import { RecoverPasswordDto } from '../model/RecoverPasswordDto';
import { ResetPasswordDto } from '../model/ResetPasswordDto';
import { ProfileUpdateDto } from '../model/ProfileUpdateDto';
import { ValidationError } from '../exception/ValidationError';
import { UserNotFoundError } from '../exception/UserNotFoundError';
import { InvalidTokenError } from '../exception/InvalidTokenError';
import { UserAlreadyExistsError } from '../exception/UserAlreadyExistsError';

export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(TokenRepository) private readonly tokenRepository: TokenRepository,
    @Inject(MailService) private readonly mailService: MailService,
  ) {}

  public async signup({ name, email, password }: SignupDto): Promise<User> {
    if (await this.userRepository.findByEmail(email)) {
      throw new UserAlreadyExistsError();
    }

    return await this.userRepository.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10),
    });
  }

  public signupWithProvider(data: SocialLoginDto): Promise<User> {
    return this.userRepository.findOrCreateByLinkedAccount(data);
  }

  public async recoverPassword({ email }: RecoverPasswordDto): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const token = await this.tokenRepository.create({
      permission: `password_reset:${email}`,
      expires: Date.now() + 24 * 3600 * 1000,
    });

    await this.mailService.send({
      template: 'password_reset',
      recepient: user.email,
      data: {
        email: user.email,
        secret: token.secret,
      },
    });
  }

  public async resetPassword({
    secret,
    email,
    password,
  }: ResetPasswordDto): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const valid = await this.tokenRepository.claim({
      secret,
      permission: `password_reset:${email}`,
    });

    if (!valid) {
      throw new InvalidTokenError();
    }

    await this.userRepository.updatePassword({
      user,
      passwordHash: await bcrypt.hash(password, 10),
    });
  }

  public async updateProfile(user: User, update: ProfileUpdateDto) {
    if (update.email || update.password) {
      if (!update.currentPassword) {
        throw new ValidationError({
          currentPassword: 'Current password is empty',
        });
      }

      const isValid = await bcrypt.compare(
        update.currentPassword,
        user.passwordHash,
      );

      if (!isValid) {
        throw new ValidationError({
          currentPassword: 'Current password is invalid',
        });
      }
    }

    if (update.name) {
      user.name = update.name;
    }

    if (update.email) {
      user.email = update.email;
    }

    if (update.password) {
      user.passwordHash = await bcrypt.hash(update.password, 10);
    }

    await this.userRepository.save(user);
  }
}