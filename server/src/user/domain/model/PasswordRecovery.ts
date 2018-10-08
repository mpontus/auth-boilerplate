import { User } from './User';

export class PasswordRecovery {
  public token: string;
  public user: User;
  public fulfilled: boolean;
  public expires: Date;

  constructor(partial: Partial<PasswordRecovery>) {
    Object.assign(this, partial);
  }
}
