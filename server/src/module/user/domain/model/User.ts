import { Exclude } from 'class-transformer';

export class User {
  id: number;

  name: string;

  email: string;

  @Exclude()
  passwordHash: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
