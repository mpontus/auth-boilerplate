import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
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
  sendEmailActivation(@Body() { email }: EmailContainer): Promise<void> {
    return this.mailerService.sendEmailActivation(email);
  }

  @Post('email_activation/verify/:token')
  completeEmailActivation(@Param('token') token: string): Promise<void> {
    return this.mailerService.completeEmailActivation(token);
  }

  @Post('password_recovery/request')
  sendPasswordRecovery(@Body() { email }: EmailContainer): Promise<void> {
    return this.mailerService.sendPasswordRecovery(email);
  }

  @Post('password_recovery/verify/:token')
  completePasswordRecovery(
    @Param('token') token: string,
    @Body() { password }: PasswordContainer,
  ): Promise<void> {
    return this.mailerService.completePasswordRecovery(token, password);
  }
}
