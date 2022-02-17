import 'dotenv/config' 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const port = process.env.PORT || 8080

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors( {
    origin: 'http://localhost:4200'
  })
  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap')
}
bootstrap();
