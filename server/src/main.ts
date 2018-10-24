import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { useContainer } from 'class-validator';
// tslint:disable-next-line:match-default-export-name
import cors from 'cors';
import { AppModule } from './AppModule';

/**
 * Entyr point to the applicaiton.
 *
 * Launches HTTP server and queue listeners.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  // Connect class-validator to DI container
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Start listeners in the same process
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_URL,
    },
  });
  await app.startAllMicroservicesAsync();

  // Launch the web server
  app.setGlobalPrefix('api');
  await app.listen(parseInt(process.env.PORT || '8080', 10));
}

// tslint:disable-next-line:no-floating-promises
bootstrap();
