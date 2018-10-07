import { User } from '../model/User';

export abstract class UserRepository {
  public abstract findByEmail(email: string): Promise<User>;
}
