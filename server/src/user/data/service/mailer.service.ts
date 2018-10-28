import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SendTemplateEmailCommand } from 'mailer/command/impl/send-template-email.command';
import { ConfigService } from 'nestjs-config';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import { User } from '../entity/user.entity';

/**
 * Email Service
 *
 * Service groups together various actions involving communicating
 * with the user by their email.
 */
@Injectable()
export class MailerService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(ConfigService) private readonly config: ConfigService,
    private readonly commandBus: CommandBus,
  ) {}

  /**
   * Request email activation code
   */
  public async sendEmailActivation(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ email });

    if (user === undefined || user.emailVerified) {
      throw new BadRequestException('Email not found or already verified');
    }

    const secret = this.getEmailActivationSecret(user);
    const token = await this.generateToken(user, secret, {
      expiresIn: this.config.get('security.email_activation_expiry'),
    });

    await this.scheduleEmailDelivery(user.email, 'email_activation', {
      recipient_name: user.name,
      action_url: this.config
        .get('app.email_activation_url')
        .replace('%s', token),
    });
  }

  /**
   * Validate email activation code
   */
  public async completeEmailActivation(token: string): Promise<void> {
    const user = await this.getTokenSubject(token);

    if (user === undefined || user.emailVerified) {
      throw new BadRequestException('Invalid token');
    }

    const secret = this.getEmailActivationSecret(user);

    if (!(await this.verifyToken(token, secret))) {
      throw new BadRequestException('Invalid token');
    }

    user.emailVerified = true;

    await this.userRepository.save(user);
  }

  /**
   * Request password reset code
   */
  public async sendPasswordRecovery(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ email });

    if (user === undefined) {
      throw new BadRequestException('Email not found or already verified');
    }

    const secret = this.getPasswordRecoverySecret(user);
    const token = await this.generateToken(user, secret, {
      expiresIn: this.config.get('security.password_recovery_expiry'),
    });

    await this.scheduleEmailDelivery(user.email, 'password_recovery', {
      recipient_name: user.name,
      action_url: this.config
        .get('app.password_recovery_url')
        .replace('%s', token),
    });
  }

  /**
   * Validate password reset code
   */
  public async completePasswordRecovery(
    token: string,
    password: string,
  ): Promise<void> {
    const user = await this.getTokenSubject(token);

    if (user === undefined) {
      throw new BadRequestException('Invalid token');
    }

    const secret = this.getPasswordRecoverySecret(user);

    if (!(await this.verifyToken(token, secret))) {
      throw new BadRequestException('Invalid token');
    }

    if (await bcrypt.compare(password, user.passwordHash)) {
      throw new BadRequestException(
        'New password must be different form the previous one',
      );
    }

    user.emailVerified = true;
    user.passwordHash = await bcrypt.hash(password, 10);

    await this.userRepository.save(user);
  }

  /**
   * Generate token secret for email activation for the user
   */
  private getEmailActivationSecret(user: User): string {
    return `${user.email}${this.config.get('security.jwt_secret')}`;
  }

  /**
   * Generate token secret for password reset for the user
   */
  private getPasswordRecoverySecret(user: User): string {
    return `${user.passwordHash}${this.config.get('security.jwt_secret')}`;
  }

  /**
   * Generate JWT token authenticating the user action
   */
  private async generateToken(
    subject: User,
    secret: string,
    options: jwt.SignOptions,
  ): Promise<string> {
    const payload = { sub: subject.id };

    return await promisify<string>(callback => {
      jwt.sign(payload, secret, options, callback);
    })();
  }

  /**
   * Retrieve subject (user) from the token
   */
  private async getTokenSubject(token: string): Promise<User | undefined> {
    try {
      const decoded = jwt.decode(token);

      if (decoded === null || typeof decoded !== 'object' || !decoded.sub) {
        return;
      }

      return await this.userRepository.findOne(decoded.sub);
    } catch (error) {
      return;
    }
  }

  /**
   * Verify token integrity
   */
  private async verifyToken(token: string, secret: string): Promise<boolean> {
    try {
      await promisify(callback => {
        jwt.verify(token, secret, callback);
      })();

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Dispatch transactional email in a non-blocking way
   */
  private async scheduleEmailDelivery(
    recipient: string,
    template: 'password_recovery' | 'email_activation',
    locals: {
      recipient_name: string;
      action_url: string;
    },
  ): Promise<void> {
    await this.commandBus.execute(
      new SendTemplateEmailCommand(recipient, template, locals),
    );
  }
}
