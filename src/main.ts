import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api/v1')
  app.enableCors()
  console.log('Starting application...',process.env.PORT);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
