import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class User {
  @Expose()
  public id: string;

  @Expose()
  public name: string;
}
