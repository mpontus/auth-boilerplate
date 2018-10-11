import { MinLength } from 'class-validator';

export class PasswordContainer {
  @MinLength(6)
  password: string;
}
