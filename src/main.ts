import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const port = parseInt(process.env.PORT ?? '3001');

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port);
}
bootstrap();
