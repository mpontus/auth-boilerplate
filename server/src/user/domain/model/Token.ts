export class Token {
  public token: string = '';

  public permission: string = '';

  public expires: number = 0;

  constructor(partial: Partial<Token>) {
    Object.assign(this, partial);
  }
}
