import { MaxLength, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @MinLength(6)
  password: string;
}
