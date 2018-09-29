import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule.create({
      googleClientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      googleClientSecret: process.env.GOOGLE_AUTH_SECRET,
      googleCallbackUrl: process.env.GOOGLE_AUTH_CALLBACK_URL,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
