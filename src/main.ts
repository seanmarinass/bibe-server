import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';

const port = 3000;
const url = `http://localhost:${port}`;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: 'secret',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: null,
        httpOnly: true,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

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
