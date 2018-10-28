import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
import { MailerModule } from './mailer/mailer.module';
import { UserModule } from './user/user.module';

/**
 * Application module
 */
@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config/**/*.{ts,js}')),
    MailerModule,
    UserModule,
  ],
})
export class AppModule {}
