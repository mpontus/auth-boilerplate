import { UserEntity } from './UserEntity';
import { User } from '../../domain/model/User';

export class UserMapper {
  transform(entity: UserEntity): User {
    return new User({
      id: `${entity.id}`,
      name: entity.name,
      email: entity.email,
      passwordHash: entity.passwordHash,
    });
  }
}
