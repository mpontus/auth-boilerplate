import { User } from './User';

export class Session {
  public readonly token: string;
  public readonly user: User;

  constructor(partial: Partial<Session>) {
    Object.assign(this, partial);
  }
}
