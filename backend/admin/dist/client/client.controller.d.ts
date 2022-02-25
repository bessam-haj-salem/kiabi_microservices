import { ClientProxy } from '@nestjs/microservices';
import { ClientDTO } from './client.dto';
import { ClientService } from './client.service';
import { HttpService } from '@nestjs/axios';
export declare class ClientController {
    private clientService;
    private httpService;
    private readonly client;
    constructor(clientService: ClientService, httpService: HttpService, client: ClientProxy);
    all(): Promise<import("./client.dto").ClientRO[]>;
    create(data: ClientDTO): Promise<import("./client.dto").ClientRO>;
    get(id: number): Promise<import("./client.dto").ClientRO>;
    update(id: number, raison_social: string, num_sirette: string, adresse: string, email: string, telephone: string): Promise<import("./client.dto").ClientRO>;
    delete(id: number): Promise<number>;
}
