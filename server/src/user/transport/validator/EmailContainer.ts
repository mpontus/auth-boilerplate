import { IsEmail, MaxLength } from "class-validator";

export class EmailContainer {
  @IsEmail()
  @MaxLength(255)
  public email: string;
}
