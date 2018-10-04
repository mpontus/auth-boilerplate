import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @MaxLength(255)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;
}
