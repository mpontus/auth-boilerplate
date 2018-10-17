import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import { IsEmailUnique } from "./IsEmailUnique";

export class SignupDto {
  @IsNotEmpty()
  @MaxLength(255)
  public name: string;

  @IsEmail()
  @Validate(IsEmailUnique)
  @MaxLength(255)
  public email: string;

  @MinLength(6)
  public password: string;
}
