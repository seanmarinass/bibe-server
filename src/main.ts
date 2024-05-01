import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

const port = 3000;
const url = `http://localhost:${port}`;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');

  const config = new DocumentBuilder()
    .setTitle('Bibe API')
    .setDescription('APIs for Bibe app')
    .setVersion('1.0')
    .addServer(url)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  logger.log(`Listening on ${url}`);
}
bootstrap();
