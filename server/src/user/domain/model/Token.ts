export class Token {
  public readonly secret: string;

  public readonly permission: string;

  public readonly expires: number;

  constructor(partial: Partial<Token>) {
    Object.assign(this, partial);
  }
}
