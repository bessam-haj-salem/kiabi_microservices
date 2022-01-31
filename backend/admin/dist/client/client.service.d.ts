import { Repository } from 'typeorm';
import { Client } from './client.entity';
export declare class ClientService {
    private readonly clientRepository;
    constructor(clientRepository: Repository<Client>);
    all(): Promise<Client[]>;
    create(data: any): Promise<Client>;
    get(id: number): Promise<Client>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<any>;
}
