import { MaxLength, IsEmail } from 'class-validator';

export class EmailContainer {
  @IsEmail()
  @MaxLength(255)
  email: string;
}
