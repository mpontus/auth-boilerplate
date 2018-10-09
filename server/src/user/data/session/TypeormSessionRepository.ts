import hat from 'hat';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, MoreThan } from 'typeorm';
import { SessionRepository } from '../../domain/abstract/SessionRepository';
import { User } from '../../domain/model/User';
import { Session } from '../../domain/model/Session';
import { UserEntity } from '../user/UserEntity';
import { SessionEntity } from './SessionEntity';

export class TypeormSessionRepository extends SessionRepository {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {
    super();
  }

  public async find(token: string): Promise<Session | null> {
    const session = await this.manager.findOne(
      SessionEntity,
      {
        token,
      },
      {
        relations: ['user'],
      },
    );

    if (!session) {
      return null;
    }

    return {
      token: session.token,
      user: {
        ...session.user,
        id: `${session.user.id}`,
      },
      destroyed: false,
    };
  }

  public async create(user: User): Promise<Session> {
    const userEntity = await this.manager.findOneOrFail(UserEntity, {
      id: parseInt(user.id, 10),
    });
    const sessionEntity = this.manager.create(SessionEntity, {
      user: userEntity,
      token: hat(),
    });

    await this.manager.save(SessionEntity, sessionEntity);

    return {
      token: sessionEntity.token,
      user: {
        ...sessionEntity.user,
        id: `${sessionEntity.user.id}`,
      },
      destroyed: false,
    };
  }

  public async destroy(token: string): Promise<Session> {
    const sessionEntity = await this.manager.findOneOrFail(
      SessionEntity,
      { token },
      {
        relations: ['user'],
      },
    );

    await this.manager.delete(SessionEntity, sessionEntity);

    return {
      token: sessionEntity.token,
      user: {
        ...sessionEntity.user,
        id: `${sessionEntity.user.id}`,
      },
      destroyed: true,
    };
  }
}
