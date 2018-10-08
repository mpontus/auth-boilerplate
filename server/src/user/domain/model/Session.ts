import { User } from './User';

export class Session {
  public token: string;
  public user: User;
  public destroyed: boolean;

  constructor(partial: Partial<Session>) {
    Object.assign(this, partial);
  }
}
