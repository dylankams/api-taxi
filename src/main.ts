import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import serverless from 'serverless-http';
import { Request, Response } from 'express';
import { INestApplication } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  return app;
}

export const handler = async (req: Request, res: Response) => {
  const app: INestApplication = await bootstrap();
  const server = serverless(app.getHttpServer());
  return server(req, res);
};

if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}
