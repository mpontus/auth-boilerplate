import { Exclude } from 'class-transformer';

export class User {
  public id: number;

  public name: string;

  public email: string;

  @Exclude()
  public passwordHash: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
