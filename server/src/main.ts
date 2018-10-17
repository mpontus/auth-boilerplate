import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { useContainer } from "class-validator";
import { AppModule } from "./AppModule";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_URL,
    },
  });
  await app.startAllMicroservicesAsync();

  await app.listen(8080);
}
bootstrap();
