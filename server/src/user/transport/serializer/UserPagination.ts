import { Exclude, Expose } from 'class-transformer';

@Exclude()
class User {
  @Expose()
  id: string;

  @Expose()
  name: string;
}

@Exclude()
export class UserPagination {
  @Expose()
  total: number;

  @Expose()
  items: User[];
}
