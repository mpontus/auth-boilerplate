import * as bcrypt from 'bcrypt';

export class CryptoService {
  constructor(private readonly saltRounds: number) {}

  hash(password: string): Promise<string> {
    return bcrypt.hash(password, 5);
  }

  verify(passwordHash: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}
