import { Token } from '../model/Token';

export abstract class TokenRepository {
  public abstract create(claim: string): Token;
}
