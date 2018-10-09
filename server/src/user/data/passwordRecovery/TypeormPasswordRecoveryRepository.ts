import hat from 'hat';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { PasswordRecoveryRepository } from '../../domain/abstract/PasswordRecoveryRepository';
import { User } from '../../domain/model/User';
import { PasswordRecovery } from '../../domain/model/PasswordRecovery';
import { UserEntity } from '../user/UserEntity';
import { PasswordRecoveryEntity } from './PasswordRecoveryEntity';

export class TypeormPasswordRecoveryRepository extends PasswordRecoveryRepository {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {
    super();
  }

  public async create(user: User): Promise<PasswordRecovery> {
    const userEntity = await this.manager.findOneOrFail(UserEntity, {
      id: parseInt(user.id),
    });

    const requestEntity = this.manager.create(PasswordRecoveryEntity, {
      user: userEntity,
      token: hat(),
      expires: new Date(),
    });

    await this.manager.save(requestEntity);

    return {
      token: requestEntity.token,
      expires: requestEntity.expires,
      user,
      fulfilled: false,
    };
  }

  public async find(token: string): Promise<PasswordRecovery | null> {
    const requestEntity = await this.manager.findOne(
      PasswordRecoveryEntity,
      {
        token,
      },
      {
        relations: ['user'],
      },
    );

    if (!requestEntity) {
      return null;
    }

    return {
      token: requestEntity.token,
      expires: requestEntity.expires,
      user: {
        ...requestEntity.user,
        id: `${requestEntity.user.id}`,
      },
      fulfilled: false,
    };
  }

  public async destroy(token: string): Promise<PasswordRecovery> {
    const requestEntity = await this.manager.findOneOrFail(
      PasswordRecoveryEntity,
      { token },
      {
        relations: ['user'],
      },
    );

    await this.manager.delete(PasswordRecoveryEntity, requestEntity);

    return {
      token: requestEntity.token,
      expires: requestEntity.expires,
      user: {
        ...requestEntity.user,
        id: `${requestEntity.user.id}`,
      },
      fulfilled: false,
    };
  }
}
