import { HttpService } from '@nestjs/axios';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController { 
    count = 0

    constructor(private clientService: ClientService, private httpService: HttpService) {}

    @Get()
    async all() {
      
            return this.clientService.all()
          
      
       
    }
  
    @EventPattern('client_created')
    async clientCreated(client) {
        console.log("my new client");
        console.log(client)
    //     this.httpService.get(`http://localhost:8099/clients/consume`).subscribe(
    //    client =>  {
    //      console.log("**************new client");
    //      console.log(client)
         this.clientService.create({
            id: client.id,
            raison_social: client.raison_social,
            num_sirette: client.num_sirette,
            adresse: client.adresse,
            email: client.email,
            telephone: client.telephone



        })
    //    }
    //  )
        

    }
   
    @EventPattern('client_updated')
    async clientUpdated(client: any) {
        console.log("********mynew client");
        console.log(client);
        const updatedclient = await this.clientService.findOne(client.id)
        if(updatedclient) {
            await this.clientService.update(client.id,{
                id: client.id,
                raison_social: client.raison_social,
                num_sirette: client.num_sirette,
                adresse: client.adresse,
                email: client.email,
                telephone: client.telephone
    
            })
        }
       

    }
    @EventPattern('client_deleted')
    async clientDeleted(id: number) {
        const deletedclient = await this.clientService.findOne(id)
        console.log("deleted client")
        console.log(deletedclient)
        console.log(`client id to delete ${id}`);
        if(deletedclient) {
            await this.clientService.delete(id)

        }
       


    }
}
