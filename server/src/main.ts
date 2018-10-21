import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { useContainer } from 'class-validator';
import { AppModule } from './AppModule';

/**
 * Entyr point to the applicaiton.
 *
 * Launches HTTP server and queue listeners.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

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
  await app.listen(8080);
}

// tslint:disable-next-line:no-floating-promises
bootstrap();
