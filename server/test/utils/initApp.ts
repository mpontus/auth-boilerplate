import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/AppModule';
import { useContainer } from 'class-validator';

export const initApp = async () => {
  const nestApp = await NestFactory.create(AppModule, {
    logger: false,
  });
  useContainer(nestApp.select(AppModule), { fallbackOnErrors: true });

  await nestApp.init();

  return {
    expressApp: nestApp.getHttpServer(),
    nestApp,
  };
};
