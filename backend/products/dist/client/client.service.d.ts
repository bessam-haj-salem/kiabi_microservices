import { Repository } from 'typeorm';
import { ClientDTO, ClientRO } from './client.dto';
import { Client } from './client.entity';
export declare class ClientService {
    private readonly clientRepository;
    constructor(clientRepository: Repository<Client>);
    all(): Promise<ClientRO[]>;
    create(data: ClientDTO): Promise<ClientRO>;
    get(id: number): Promise<ClientRO>;
    update(id: number, data: Partial<ClientDTO>): Promise<ClientRO>;
    delete(id: number): Promise<any>;
}
