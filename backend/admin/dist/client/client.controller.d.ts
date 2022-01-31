import { ClientProxy } from '@nestjs/microservices';
import { ClientService } from './client.service';
export declare class ClientController {
    private clientService;
    private readonly client;
    constructor(clientService: ClientService, client: ClientProxy);
    all(): Promise<import("./client.entity").Client[]>;
    create(raison_social: string, num_sirette: string, adresse: string, email: string, telephone: string): Promise<import("./client.entity").Client>;
    get(id: number): Promise<import("./client.entity").Client>;
    update(id: number, raison_social: string, num_sirette: string, adresse: string, email: string, telephone: string): Promise<import("./client.entity").Client>;
    delete(id: number): Promise<void>;
}
