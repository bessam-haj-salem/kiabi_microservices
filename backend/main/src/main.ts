import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.enableCors( {
    origin:['http://localhost:4200','http://localhost:8099']
  })
  app.listen(3001)

 
  

 
}
bootstrap();
