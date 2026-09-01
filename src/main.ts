import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableShutdownHooks();

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, '0.0.0.0');

  const url = await app.getUrl();
  Logger.log(`Application: ${url}`, 'Bootstrap');
  Logger.log(`Apollo Sandbox: ${url}/graphql`, 'Bootstrap');
}

bootstrap();
