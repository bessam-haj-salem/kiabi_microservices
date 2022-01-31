import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController { 

    constructor(private clientService: ClientService, private httpService: HttpService) {}

    @Get()
    async all() {
        return this.clientService.all()
    }

  
    
    @EventPattern('client_created')
    async clientCreated(client: any) {
        this.clientService.create({
            id: client.id,
            raison_social: client.raison_social,
            num_sirette: client.num_sirette,
            adresse: client.adresse,
            email: client.email,
            telephone: client.telephone



        })

    }
    @EventPattern('client_updated')
    async clientUpdated(client: any) {

       await this.clientService.update(client.id,{
            id: client.id,
            raison_social: client.raison_social,
            num_sirette: client.num_sirette,
            adresse: client.adresse,
            email: client.email,
            telephone: client.telephone

        })

    }

    @EventPattern('client_deleted')
    async clientDeleted(id: number) {
        console.log(`client id to delete ${id}`);

       await this.clientService.delete(id)

    }
}
