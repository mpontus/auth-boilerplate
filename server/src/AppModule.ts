import { Module } from '@nestjs/common';
import { UserModule } from './user/UserModule';
import { MailerModule } from './mailer/MailerModule';
import { ConfigModule } from 'nestjs-config';

@Module({
  imports: [ConfigModule.load(), MailerModule, UserModule],
})
export class AppModule {}
