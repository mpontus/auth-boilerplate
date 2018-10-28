import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import hat from 'hat';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Session } from '../entity/session.entity';
import { User } from '../entity/user.entity';
import { SignupDto } from '../interface/signup-dto.interface';
import { MailerService } from './mailer.service';

/**
 * Session Service
 *
 * Allows users to authenticate with the website.
 */
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(MailerService) private readonly mailerService: MailerService,
  ) {}

  /**
   * Return a user associated with the session
   */
  public async authenticate(token: string): Promise<User | undefined> {
    const session = await this.sessionRepository.findOne(token, {
      relations: ['user'],
    });

    if (session === undefined) {
      return undefined;
    }

    return session.user;
  }

  /**
   * Create session for an existing user
   */
  public async login(email: string, password: string): Promise<Session> {
    const user = await this.userRepository.findOne({ email });

    if (user == null) {
      throw new BadRequestException('Bad credentials');
    }

    if (!(await bcrypt.compare(password, user.passwordHash))) {
      throw new BadRequestException('Bad credentials');
    }

    return await this.sessionRepository.save({
      token: hat(),
      user,
    });
  }

  /**
   * Create a session with new anonymous user
   */
  public async loginAnonymously(): Promise<Session> {
    return await this.sessionRepository.save({
      token: hat(),
      user: this.userRepository.create({
        id: uuid(),
        isAnonymous: true,
      }),
    });
  }

  /**
   * Create session for a new user
   */
  public async signup({ name, email, password }: SignupDto): Promise<Session> {
    const session = await this.sessionRepository.save({
      token: hat(),
      user: this.userRepository.create({
        id: uuid(),
        isAnonymous: false,
        roles: ['user'],
        name,
        email,
        passwordHash: await bcrypt.hash(password, 10),
      }),
    });

    await this.mailerService.sendEmailActivation(email);

    return session;
  }

  /**
   * Destroy user session
   */
  public async logout(actor: User, token: string): Promise<void> {
    const session = await this.sessionRepository.findOne(token, {
      relations: ['user'],
    });

    if (session === undefined || session.user.id !== actor.id) {
      throw new ForbiddenException();
    }

    await this.sessionRepository.remove(session);
  }
}
