import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from '../../src/AppModule';

export const initApp = async () => {
  const nestApp = await NestFactory.create(AppModule, {
    logger: false,
  });

  nestApp.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_URL,
    },
  });
  await nestApp.startAllMicroservicesAsync();

  await nestApp.init();

  return {
    expressApp: nestApp.getHttpServer(),
    nestApp,
  };
};
