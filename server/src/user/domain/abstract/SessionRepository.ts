import { Session } from '../model/Session';
import { User } from '../model/User';

export abstract class SessionRepository {
  public abstract find(token: string): Promise<Session>;

  public abstract create(user: User): Promise<Session>;

  public abstract destroy(token: string): Promise<void>;
}
