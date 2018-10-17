import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from 'nestjs-config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/User.entity';

@Injectable()
export class MailerService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(ConfigService) private readonly config: ConfigService,
    @Inject(ClientProxy) private readonly clientProxy: ClientProxy,
  ) {}

  async sendEmailActivation(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ email });

    if (!user || user.emailVerified) {
      throw new BadRequestException('Email not found or already verified');
    }

    const secret = this.getEmailActivationSecret(user);
    const token = await this.generateToken(user, secret, {
      expiresIn: this.config.get('app.email_activation_expiry'),
    });

    this.scheduleEmailDelivery(user.email, 'email_activation', {
      recipient_name: user.name,
      token,
    });
  }

  async completeEmailActivation(token: string): Promise<void> {
    const user = await this.getTokenSubject(token);

    if (!user || user.emailVerified) {
      throw new BadRequestException('Invalid token');
    }

    const secret = this.getEmailActivationSecret(user);

    if (!(await this.verifyToken(token, secret))) {
      throw new BadRequestException('Invalid token');
    }

    user.emailVerified = true;

    await this.userRepository.save(user);
  }

  async sendPasswordRecovery(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new BadRequestException('Email not found or already verified');
    }

    const secret = this.getPasswordRecoverySecret(user);
    const token = await this.generateToken(user, secret, {
      expiresIn: this.config.get('app.password_recovery_expiry'),
    });

    this.scheduleEmailDelivery(user.email, 'password_recovery', {
      recipient_name: user.name,
      token,
    });
  }

  async completePasswordRecovery(
    token: string,
    password: string,
  ): Promise<void> {
    const user = await this.getTokenSubject(token);

    if (!user) {
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

  private getEmailActivationSecret(user: User): string {
    return user.email + this.config.get('app.jwt_secret');
  }

  private getPasswordRecoverySecret(user: User): string {
    return user.passwordHash + this.config.get('app.jwt_secret');
  }

  private async generateToken(
    subject: User,
    secret: string,
    options: jwt.SignOptions,
  ): Promise<string> {
    const payload = { sub: subject.id };

    return await promisify<string>(callback =>
      jwt.sign(payload, secret, options, callback),
    )();
  }

  private async getTokenSubject(token: string): Promise<User | undefined> {
    try {
      const decoded = jwt.decode(token);

      if (!decoded || typeof decoded !== 'object' || !decoded.sub) {
        return;
      }

      return await this.userRepository.findOne(decoded.sub);
    } catch (error) {
      return;
    }
  }

  private async verifyToken(token: string, secret: string): Promise<boolean> {
    try {
      await promisify(callback => jwt.verify(token, secret, callback))();

      return true;
    } catch {
      return false;
    }
  }

  private scheduleEmailDelivery(
    recipient: string,
    template: string,
    locals: object,
  ) {
    this.clientProxy
      .send(
        { cmd: 'send_transactional_email' },
        { recipient, template, locals },
      )
      .toPromise(); // fire up cold observable
  }
}
