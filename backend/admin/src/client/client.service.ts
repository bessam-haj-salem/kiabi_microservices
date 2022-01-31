import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client) private readonly clientRepository:Repository<Client>
    ) {}


    async all():Promise<Client[]> {
        return this.clientRepository.find()
    }

    async create(data):Promise<Client>{
        return this.clientRepository.save(data)
    }

    async get(id: number):Promise<Client> {
        return this.clientRepository.findOne({id})
    }

    async update(id:number, data): Promise<any> {
        return this.clientRepository.update(id, data)
    }

    async delete(id: number): Promise<any> {
        return this.clientRepository.delete(id)

    }
}

