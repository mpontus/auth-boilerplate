import {
  IsNotEmpty,
  MaxLength,
  IsEmail,
  MinLength,
  Validate,
} from 'class-validator';
import { IsEmailUnique } from './IsEmailUnique';

export class SignupDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsEmail()
  @Validate(IsEmailUnique)
  @MaxLength(255)
  email: string;

  @MinLength(6)
  password: string;
}
