import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import * as mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // console.log(process.env.MONGO_URL)
  await app.listen(process.env.PORT);
}
bootstrap();
