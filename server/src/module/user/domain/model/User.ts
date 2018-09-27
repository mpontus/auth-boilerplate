import { Exclude } from 'class-transformer';

export class User {
  public readonly id: number;

  public readonly name: string;

  public readonly email: string;

  @Exclude()
  public readonly passwordHash: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
