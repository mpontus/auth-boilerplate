import * as hat from 'hat';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { UserMapper } from '../user/user.mapper';
import { SessionEntity } from './session.entity';
import { User } from '../../domain/model/User';
import { Session } from '../../domain/model/Session';

export class SessionRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    @Inject(UserMapper) private readonly userMapper: UserMapper,
  ) {}

  async create(user: User): Promise<Session> {
    const userEntity = await this.userRepository.findOne({
      id: parseInt(user.id, 10),
    });
    const sessionEntity = this.sessionRepository.create({
      user: userEntity,
      token: hat(),
    });

    await this.sessionRepository.save(sessionEntity);

    return new Session({
      token: sessionEntity.token,
    });
  }

  async findUser(token: string): Promise<User> {
    const result = await this.sessionRepository.findOne(
      { token },
      { relations: ['user'] },
    );

    if (result == null) {
      return null;
    }

    return this.userMapper.transform(result.user);
  }
}
