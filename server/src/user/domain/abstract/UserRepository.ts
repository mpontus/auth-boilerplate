import { User } from '../model/User';

export abstract class UserRepository {
  public abstract findByEmail(email: string): Promise<User | null>;

  public abstract save(user: User): Promise<User>;
}
