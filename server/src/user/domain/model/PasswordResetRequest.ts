export class PasswordResetRequest {
  public email: string = '';
  public token: string = '';

  constructor(values: Partial<PasswordResetRequest>) {
    Object.assign(this, values);
  }
}
