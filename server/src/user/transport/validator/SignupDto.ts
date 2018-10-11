import { IsNotEmpty, MaxLength, IsEmail, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @MinLength(6)
  password: string;
}
