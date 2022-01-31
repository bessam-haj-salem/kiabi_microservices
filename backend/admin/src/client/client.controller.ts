import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController {

 constructor(private clientService: ClientService,
    @Inject('CLIENT_SERVICE') private readonly client:ClientProxy) {}

  @Get()
  async all() {
    // this.client.emit('hello','Hello from RabbitMQ')
    return this.clientService.all();
  }

  @Post()
  async create(@Body('raison_social') raison_social: string, @Body('num_sirette') num_sirette: string,@Body('adresse') adresse: string,@Body('email') email: string,@Body('telephone') telephone: string,) {
     const client = await this.clientService.create({raison_social, num_sirette,adresse, email, telephone})
     this.client.emit('client_created', client)
     return client

  }

  @Get(':id')
  async get(@Param('id') id:number ){
      return this.clientService.get(id)
  }

  @Put(':id')
  async update(@Param('id') id:number, @Body('raison_social') raison_social: string, @Body('num_sirette') num_sirette: string,@Body('adresse') adresse: string,@Body('email') email: string,@Body('telephone') telephone: string,) {
   await this.clientService.update(id, {raison_social, num_sirette,adresse, email, telephone} )
   const client = await this.clientService.get(id)
   this.client.emit('client_updated', client)
   return client
   
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.clientService.delete(id)
   this.client.emit('client_deleted', id)

  }
  



}

