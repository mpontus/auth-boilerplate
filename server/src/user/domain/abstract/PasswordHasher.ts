export abstract class PasswordHasher {
  abstract hash(password: string): Promise<string>;
  abstract verify(password: string, passwordHash: string): Promise<boolean>;
}
