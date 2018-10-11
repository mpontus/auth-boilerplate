import { Module } from '@nestjs/common';
import { UserModule } from './user/UserModule';
import { MailerModule } from './mailer/MailerModule';

@Module({
  imports: [MailerModule, UserModule],
})
export class AppModule {}
