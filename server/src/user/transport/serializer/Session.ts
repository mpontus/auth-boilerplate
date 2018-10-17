import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import { User } from './User';

@Exclude()
export class Session {
  @Expose()
  public token: string;

  @Expose()
  @Transform(user => {
    if (user.isAnonymous) {
      return null;
    }

    return plainToClass(User, user);
  })
  public user: User | null;
}
