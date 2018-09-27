import { Exclude } from 'class-transformer';

export class UserJson {
  id: number;

  name: string;

  email: string;

  @Exclude()
  passwordHash: string;

  constructor(partial: Partial<UserJson>) {
    Object.assign(this, partial);
  }
}
