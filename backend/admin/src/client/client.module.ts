import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './client.controller';
import { Client } from './client.entity';
import { ClientService } from './client.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    HttpModule,
    ClientsModule.register([
      {
        name: 'CLIENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://irdvzayl:yl69j2GXNVVUs6RXXdZSJT_T2wmlsYuN@beaver.rmq.cloudamqp.com/irdvzayl'],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      },
      // {
      //   name: 'PRODUCT_CLIENT_SERVICE',
      //   transport: Transport.RMQ,
      //   options: {
      //     urls: ['amqps://irdvzayl:yl69j2GXNVVUs6RXXdZSJT_T2wmlsYuN@beaver.rmq.cloudamqp.com/irdvzayl'],
      //     queue: 'product_client_queue',
      //     queueOptions: {
      //       durable: false
      //     },
      //   },
      // },
      
    ]),
  ],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}
