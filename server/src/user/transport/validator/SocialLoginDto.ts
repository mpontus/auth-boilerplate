import { IsNotEmpty, MaxLength, IsEmail, MinLength } from 'class-validator';

export class SocialLoginDto {
  @IsNotEmpty()
  code: string;
}
