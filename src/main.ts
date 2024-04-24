import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
require("dotenv").config()
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  console.log(process.env.ip)
  const app = await NestFactory.create(AppModule);
  const port = 3000
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  const config = new DocumentBuilder()
    .setTitle('TrelloService')
    .setDescription('Trello Service Doc API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);
  app.enableCors()
  await app.listen(port, process.env.ip).then(() => console.log(`Trello Services || port: ${port}`));
}
bootstrap();
