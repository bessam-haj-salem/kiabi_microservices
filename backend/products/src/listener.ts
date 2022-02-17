import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {


  //**** case of microservices********* */
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://irdvzayl:yl69j2GXNVVUs6RXXdZSJT_T2wmlsYuN@beaver.rmq.cloudamqp.com/irdvzayl'],
      queue: 'product_queue',
      queueOptions: {
        durable: false,
      },
    },
  })
 await app.listen()
  

 
}
bootstrap();
