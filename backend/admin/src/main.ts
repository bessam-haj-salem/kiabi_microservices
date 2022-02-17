import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.enableCors( {
    origin: ['http://localhost:4200','http://localhost:8099']
  })
  await app.listen(3000);
}
bootstrap();
