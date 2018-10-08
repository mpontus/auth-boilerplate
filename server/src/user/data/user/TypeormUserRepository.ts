import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UserRepository } from '../../domain/abstract/UserRepository';
import { User } from '../../domain/model/User';
import { UserEntity } from './UserEntity';

export class TypeormUserRepository extends UserRepository {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {
    super();
  }

  async findByEmail(email: string) {
    const userEntity = await this.manager.findOne(UserEntity, { email });

    if (!userEntity) {
      return null;
    }

    return new User({
      id: `${userEntity.id}`,
      name: userEntity.name,
      email: userEntity.email,
      passwordHash: userEntity.passwordHash,
    });
  }

  async save(user: Partial<User>) {
    const userEntity = this.manager.create(
      UserEntity,
      user.id
        ? {
            id: parseInt(user.id),
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
          }
        : {
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
          },
    );

    await this.manager.save(UserEntity, userEntity);

    return new User({
      id: `${userEntity.id}`,
      name: userEntity.name,
      email: userEntity.email,
      passwordHash: userEntity.passwordHash,
    });
  }
}
