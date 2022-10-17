import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, UsePipes,  } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { AuthGuard } from 'src/shared/auth.guard';
import { ClientDTO } from './client.dto';
import { ValidationPipe } from '../shared/validation.pipe';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController {

 constructor(private clientService: ClientService, 
   ) {}

  @Get()
  @UseGuards(new AuthGuard())
  async all() {
    let allclients = this.clientService.all();
    return allclients;
  }

  // @EventPattern('client_created')
  @Post('add')
  // @UseGuards(new AuthGuard())
  async create(@Body() data:any) {
    console.log("data new client")
    console.log(data)
     const client = await this.clientService.create(data)
     return client

  }

  @Get(':id')
  // @UseGuards(new AuthGuard())
  async get(@Param('id') id:number ){
      return this.clientService.get(id)
  }

  // @UsePipes(new ValidationPipe())
  // @UseGuards(new AuthGuard())
  @Put('edit/:id')
  async update(@Param('id') id:number, @Body() data:any) {
    console.log(id);
    console.log(data)
   await this.clientService.update(id, data )
   const newclient = await this.clientService.get(id)
   return newclient
   
  }

  @Delete('delete/:id')
  // @UseGuards(new AuthGuard())
  async delete(@Param('id') id: number) {
    console.log(" id to delete");
    console.log(id)
    await this.clientService.delete(id)
   return id

  }
  



}

