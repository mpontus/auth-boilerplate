import {
  BadRequestException,
  Inject,
  UnauthorizedException,
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

export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(OAuthClient) private readonly oauthClient: OAuthClient,
  ) {}

  public async authenticate(token: string): Promise<User | undefined> {
    const session = await this.sessionRepository.findOne(token, {
      relations: ['user'],
    });

    if (session === undefined) {
      return undefined;
    }

    return session.user;
  }

  public async login(email: string, password: string): Promise<Session> {
    const user = await this.userRepository.findOne({ email });

    if (user == null) {
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException();
    }

    return await this.sessionRepository.save({
      token: hat(),
      user,
    });
  }

  public async loginAnonymously(): Promise<Session> {
    return await this.sessionRepository.save({
      token: hat(),
      user: this.userRepository.create({
        id: uuid(),
        isAnonymous: true,
      }),
    });
  }

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

  public async logout(actor: User, token: string): Promise<void> {
    const session = await this.sessionRepository.findOne(token, {
      relations: ['user'],
    });

    if (session === undefined || session.user.id !== actor.id) {
      throw new UnauthorizedException();
    }

    await this.sessionRepository.remove(session);
  }
}
