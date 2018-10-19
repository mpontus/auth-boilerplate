import {
  BadRequestException,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import hat from 'hat';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { OAuthClient } from '../../oauth/OAuthClient';
import { Session } from '../entity/Session.entity';
import { SocialLogin } from '../entity/SocialLogin.entity';
import { User } from '../entity/User.entity';
import { SignupDto } from '../interface/SignupDto';

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
    @Inject(OAuthClient) private readonly oauthClient: OAuthClient,
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
    return await this.sessionRepository.save({
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
  }

  /**
   * Create session for a user associated with social network profile.
   *
   * Creates a new user if no user account associated with given
   * profile exists.
   */
  public async signupWithProvider(
    provider: string,
    code: string,
  ): Promise<Session> {
    const profile = await this.oauthClient.getProfile(provider, code);

    if (profile == null) {
      throw new BadRequestException();
    }

    let user = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin(SocialLogin, 'social', 'social.userId = user.id')
      .where('social.provider = :provider AND social.providerId = :id', {
        provider,
        id: profile.id,
      })
      .getOne();

    if (user == null) {
      user = this.userRepository.create({
        id: uuid(),
        name: profile.displayName,
      });

      await this.userRepository.save(user);
    }

    const session = this.sessionRepository.create({
      token: hat(),
      user,
    });

    await this.sessionRepository.save(session);

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
