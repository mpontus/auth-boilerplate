import { plainToClass, Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
class User {
  @Expose()
  id: string;

  @Expose()
  name: string;
}

@Exclude()
export class Session {
  @Expose()
  token: string;

  @Expose()
  @Transform(user => {
    if (user.isAnonymous) {
      return null;
    }

    return plainToClass(User, user);
  })
  user: User | null;
}
