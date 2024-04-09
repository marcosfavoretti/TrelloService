import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
require("dotenv").config()

async function bootstrap() {
  console.log(process.env.ip)
  const app = await NestFactory.create(AppModule);
  const port = 3000
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  await app.listen(port, process.env.ip).then(() => console.log(`Trello Services || port: ${port}`));
}
bootstrap();
