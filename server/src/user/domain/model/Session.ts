export class Session {
  public readonly token: string;

  constructor(partial: Partial<Session>) {
    Object.assign(this, partial);
  }
}
