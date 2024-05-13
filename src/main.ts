import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { AllExceptionsFilter } from './filters/all-exceptions/all-exceptions.filter';
import { GlobalExceptionFilter } from './filters/global-exception/global-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { createLogger } from 'winston';
import { loggerOptions } from './logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: createLogger({ ...loggerOptions }),
    }),
  });
  app.useGlobalFilters(
    new GlobalExceptionFilter(
      new HttpExceptionFilter(),
      new AllExceptionsFilter(),
    ),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
