import { IsNotEmpty } from 'class-validator';

export class SocialLoginDto {
  @IsNotEmpty()
  code: string;
}
