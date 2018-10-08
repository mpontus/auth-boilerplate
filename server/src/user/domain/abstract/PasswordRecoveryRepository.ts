import { User } from '../model/User';
import { PasswordRecovery } from '../model/PasswordRecovery';

export abstract class PasswordRecoveryRepository {
  public abstract create(user: User): Promise<PasswordRecovery>;

  public abstract find(token: string): Promise<PasswordRecovery | null>;

  public abstract destroy(token: string): Promise<PasswordRecovery>;
}
