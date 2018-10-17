import { IsNotEmpty } from "class-validator";

export class SocialLoginDto {
  @IsNotEmpty()
  public code: string;
}
