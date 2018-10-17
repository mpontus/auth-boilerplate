import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import { MailerModule } from './mailer/MailerModule';
import { UserModule } from './user/UserModule';

/**
 * Application module
 */
@Module({
  imports: [ConfigModule.load(), MailerModule, UserModule],
})
export class AppModule {}
