import { Body, CACHE_MANAGER, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, UsePipes,  } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/shared/auth.guard';
import { ClientDTO } from './client.dto';
import { ValidationPipe } from '../shared/validation.pipe';
import { ClientService } from './client.service';
import { HttpService } from '@nestjs/axios';
import {Cache} from 'cache-manager'

@Controller('clients')
export class ClientController {

 constructor(private clientService: ClientService, 
    // @Inject('CLIENT_SERVICE') private readonly client:ClientProxy,@Inject(CACHE_MANAGER) private cacheManager: Cache
   ) {}

  @Get()
  // @UseGuards(new AuthGuard())
  async all() {
    // let value = await this.cacheManager.get<ClientDTO>('clients')
    // console.log(value);
    // if(value) {
    //   return {
    //     data: value,
    //     LoadsFrom: 'redis cache'
    //   }
    // }
    let allclients = this.clientService.all();
    // let test= "hello world"

    // await this.cacheManager.set('clients', test, {ttl:300})

    // this.client.emit('hello','Hello from RabbitMQ')
    // console.log("*****************hello cients")
    // console.log(allclients);
    return allclients;
  }

  @Post('add')
  @UsePipes(new ValidationPipe())
  // @UseGuards(new AuthGuard())
  async create(@Body() data: ClientDTO) {
    console.log("data new client")
    console.log(data)
     const client = await this.clientService.create(data)
    //  this.client.emit('client_created', client)
    //  this.httpService.post(`http://localhost:3002/api/clients/add`,client).subscribe(
    //    res =>  {
    //      console.log("**************res");
    //      console.log(res)
    //    }
    //  )

     return client

  }

  @Get(':id')
  // @UseGuards(new AuthGuard())
  async get(@Param('id') id:number ){
    console.log("*****id");
    console.log(id);
      return this.clientService.get(id)
  }

  @Put('edit/:id')
  @UsePipes(new ValidationPipe())
  // @UseGuards(new AuthGuard())
  async update(@Param('id') id:number, @Body('raison_social') raison_social: string, @Body('num_sirette') num_sirette: string,@Body('adresse') adresse: string,@Body('email') email: string,@Body('telephone') telephone: string,) {
    console.log(raison_social)
   await this.clientService.update(id, {raison_social, num_sirette,adresse, email, telephone} )
   const client = await this.clientService.get(id)
   console.log(client)
  //  this.client.emit('client_updated', client)
  //  this.httpService.put(`http://localhost:3002/api/clients/edit/${id}`,client).subscribe(
  //      res =>  {
  //        console.log("**************res");
  //        console.log(res)
  //      }
  //    )
  //  this.client1.emit('client_updated', client)

   return client
   
  }

  @Delete('delete/:id')
  // @UseGuards(new AuthGuard())
  async delete(@Param('id') id: number) {
    console.log(" id to delete");
    console.log(id)
    await this.clientService.delete(id)
  //  this.client.emit('client_deleted', id)
  //  this.httpService.delete(`http://localhost:3002/api/clients/delete/${id}`).subscribe(
  //   res =>  {
  //     console.log("**************res");
  //     console.log(res)
  //   }
  // )

   return id

  }
  



}

