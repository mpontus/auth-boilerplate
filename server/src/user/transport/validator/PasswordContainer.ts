import { MinLength } from "class-validator";

export class PasswordContainer {
  @MinLength(6)
  public password: string;
}
