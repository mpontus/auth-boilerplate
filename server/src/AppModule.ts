import { Module } from '@nestjs/common';
import { UserModule } from './user/UserModule';
import { MailerModule } from './mailer/MailerModule';

@Module({
  imports: [
    MailerModule,
    UserModule.create({
      databaseUrl: process.env.DATABASE_URL,
      googleClientId: process.env.GOOGLE_AUTH_CLIENT_ID || '',
      googleClientSecret: process.env.GOOGLE_AUTH_SECRET || '',
      googleCallbackUrl: process.env.GOOGLE_AUTH_CALLBACK_URL || '',
    }),
  ],
})
export class AppModule {}
