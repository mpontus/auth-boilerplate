import { User } from '../model/User';

export abstract class UserRepository {
  public abstract findByEmail(email: string): Promise<User>;

  public abstract save(user: User): Promise<void>;
}
