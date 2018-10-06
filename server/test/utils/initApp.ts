import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/AppModule';

export const initApp = async () => {
  const nestApp = await NestFactory.create(AppModule, {
    logger: false,
  });

  await nestApp.init();

  return {
    expressApp: nestApp.getHttpServer(),
    nestApp,
  };
};
