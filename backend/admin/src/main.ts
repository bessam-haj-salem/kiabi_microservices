import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

// create the microservices options object
// const MicroserviceOptions = {
//   transport: Transport.REDIS,
//   options: {
//     url: 'redis://localhost:6379',
//   },
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:9000'],
  });
  await app.listen(3000);
}
bootstrap();
