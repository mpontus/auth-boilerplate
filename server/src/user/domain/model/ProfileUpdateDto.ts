import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';

export class ProfileUpdateDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsString()
  currentPassword: string;
}
