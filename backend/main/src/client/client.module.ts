import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { Client, ClientSchema } from './client.model';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  imports: [MongooseModule.forFeature([{name:Client.name, schema: ClientSchema}]),
HttpModule],
  providers: [ClientService],
  controllers: [ClientController]
})
export class ClientModule {}
