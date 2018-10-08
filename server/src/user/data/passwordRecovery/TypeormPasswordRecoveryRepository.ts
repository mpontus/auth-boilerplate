import hat from 'hat';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { PasswordRecoveryRepository } from '../../domain/abstract/PasswordRecoveryRepository';
import { User } from '../../domain/model/User';
import { PasswordRecovery } from '../../domain/model/PasswordRecovery';
import { UserEntity } from '../user/UserEntity';
import { PasswordRecoveryEntity } from './PasswordRecoveryEntity';

export class TypeormPasswordRecoveryRepository extends PasswordRecoveryRepository {
  constructor(
    @InjectEntityManager() private readonly manager: EntityManager,
    @Inject() private readonly userRepository: UserRepository,
  ) {
    super();
  }

  public async create(user: User): Promise<PasswordRecovery> {
    const requestEntity = this.manager.create(PasswordRecoveryEntity, {
      userId: user.id,
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
    return null;
  }

  public async destroy(token: string): Promise<PasswordRecovery> {
    return new PasswordRecovery({});
  }
}
