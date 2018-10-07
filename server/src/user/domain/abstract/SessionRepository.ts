import { Session } from '../model/Session';
import { User } from '../model/User';

export abstract class SessionRepository {
  public abstract create(user: User): Promise<Session>;
}
