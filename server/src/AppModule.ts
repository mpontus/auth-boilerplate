import { Module } from "@nestjs/common";
import { ConfigModule } from "nestjs-config";
import { MailerModule } from "./mailer/MailerModule";
import { UserModule } from "./user/UserModule";

@Module({
  imports: [ConfigModule.load(), MailerModule, UserModule],
})
export class AppModule {}
