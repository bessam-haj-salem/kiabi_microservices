import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientDTO, ClientRO } from './client.dto';
import { Client } from './client.entity';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client) private readonly clientRepository:Repository<Client>
    ) {}


    async all():Promise<ClientRO[]> {
        let res = await this.clientRepository.find()
      
        return res
    }

    async create(data: ClientDTO):Promise<ClientRO>{
        return this.clientRepository.save(data)
    }

    async get(id: number):Promise<ClientRO> {
        return this.clientRepository.findOne({id})
    }

    async update(id:number, data:Partial<ClientDTO>): Promise<ClientRO> {
        await this.clientRepository.update(id, data)
        return this.clientRepository.findOne(id)
    }

    async delete(id: number): Promise<any> {
        await this.clientRepository.delete(id)
        return this.clientRepository.findOne(id)

    }
}

