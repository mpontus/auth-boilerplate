import { IsString, IsEmail, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly secret: string;

  @IsString()
  @MinLength(6)
  readonly password: string;
}
