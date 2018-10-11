import { Module } from '@nestjs/common';
import { UserModule } from './user/UserModule';
import { MailerModule } from './mailer/MailerModule';
import { ConfigModule } from 'nestjs-config';

@Module({
  imports: [MailerModule, UserModule, ConfigModule.load()],
})
export class AppModule {}
