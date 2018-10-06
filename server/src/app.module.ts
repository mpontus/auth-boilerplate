import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule.create({
      googleClientId: process.env.GOOGLE_AUTH_CLIENT_ID || '',
      googleClientSecret: process.env.GOOGLE_AUTH_SECRET || '',
      googleCallbackUrl: process.env.GOOGLE_AUTH_CALLBACK_URL || '',
    }),
  ],
})
export class AppModule {}
