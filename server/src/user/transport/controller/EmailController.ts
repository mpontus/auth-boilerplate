import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MailerService } from '../../data/service/MailerService';
import { EmailContainer } from '../validator/EmailContainer';
import { PasswordContainer } from '../validator/PasswordContainer';

@Controller('email')
@UsePipes(new ValidationPipe({ transform: true }))
export class EmailController {
  constructor(
    @Inject(MailerService) private readonly mailerService: MailerService,
  ) {}

  @Post('email_activation/request')
  @HttpCode(HttpStatus.ACCEPTED)
  sendEmailActivation(@Body() { email }: EmailContainer): Promise<void> {
    return this.mailerService.sendEmailActivation(email);
  }

  @Post('email_activation/verify/:token')
  @HttpCode(HttpStatus.ACCEPTED)
  completeEmailActivation(@Param('token') token: string): Promise<void> {
    return this.mailerService.completeEmailActivation(token);
  }

  @Post('password_recovery/request')
  @HttpCode(HttpStatus.ACCEPTED)
  sendPasswordRecovery(@Body() { email }: EmailContainer): Promise<void> {
    return this.mailerService.sendPasswordRecovery(email);
  }

  @Post('password_recovery/verify/:token')
  @HttpCode(HttpStatus.ACCEPTED)
  completePasswordRecovery(
    @Param('token') token: string,
    @Body() { password }: PasswordContainer,
  ): Promise<void> {
    return this.mailerService.completePasswordRecovery(token, password);
  }
}
