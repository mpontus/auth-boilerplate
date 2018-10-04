import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';

export const initApp = async () => {
  const expressApp = express();

  const nestApp = await await NestFactory.create(AppModule, expressApp, {
    logger: false,
  });

  await nestApp.init();

  return { expressApp, nestApp };
};
