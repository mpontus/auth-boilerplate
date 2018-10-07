import { Token } from '../model/Token';

export abstract class TokenRepository {
  public abstract create(permit: string): Promise<Token>;

  public abstract claim(permit: string, token: string): Promise<boolean>;
}
