import { IsString } from 'class-validator';

export class SocialLoginDto {
  @IsString()
  readonly provider: string;

  @IsString()
  readonly id: string;

  @IsString()
  readonly displayName: string;
}
