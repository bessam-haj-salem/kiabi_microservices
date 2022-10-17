import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  HttpModule,
  ClientsModule.register([
    {
      name: 'CLIENT_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://irdvzayl:yl69j2GXNVVUs6RXXdZSJT_T2wmlsYuN@beaver.rmq.cloudamqp.com/irdvzayl'],
        queue: 'admin_queue',
        queueOptions: {
          durable: false
        },
      },
    },
    {
      name: 'PRODUCT_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://irdvzayl:yl69j2GXNVVUs6RXXdZSJT_T2wmlsYuN@beaver.rmq.cloudamqp.com/irdvzayl'],
        queue: 'product_queue',
        queueOptions: {
          durable: false
        },
      },
    }
  ])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
