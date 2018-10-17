import { IsEmail, MaxLength, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail()
  @MaxLength(255)
  public email: string;

  @MinLength(6)
  public password: string;
}
