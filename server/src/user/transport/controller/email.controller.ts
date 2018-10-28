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
import { MailerService } from '../../data/service/mailer.service';
import { EmailContainer } from '../validator/email-container.validator';
import { PasswordContainer } from '../validator/password-container.validator';

/**
 * EmailController
 *
 * Groups together various actions which involve communicating with
 * the user by their email address
 */
@Controller('email')
@UsePipes(new ValidationPipe({ transform: true }))
export class EmailController {
  constructor(
    @Inject(MailerService) private readonly mailerService: MailerService,
  ) {}

  /**
   * Resend email activation message
   */
  @Post('email_activation/request')
  @HttpCode(HttpStatus.ACCEPTED)
  public async sendEmailActivation(@Body() { email }: EmailContainer): Promise<
    void
  > {
    return this.mailerService.sendEmailActivation(email);
  }

  /**
   * Activate user email address
   */
  @Post('email_activation/verify/:token')
  @HttpCode(HttpStatus.ACCEPTED)
  public async completeEmailActivation(
    @Param('token') token: string,
  ): Promise<void> {
    return this.mailerService.completeEmailActivation(token);
  }

  /**
   * Request password recovery code
   */
  @Post('password_recovery/request')
  @HttpCode(HttpStatus.ACCEPTED)
  public async sendPasswordRecovery(@Body() { email }: EmailContainer): Promise<
    void
  > {
    return this.mailerService.sendPasswordRecovery(email);
  }

  /**
   * Reset the password using password recovery code
   */
  @Post('password_recovery/verify/:token')
  @HttpCode(HttpStatus.ACCEPTED)
  public async completePasswordRecovery(
    @Param('token') token: string,
    @Body() { password }: PasswordContainer,
  ): Promise<void> {
    return this.mailerService.completePasswordRecovery(token, password);
  }
}
