import { HttpService } from '@nestjs/axios';
import { ClientService } from './client.service';
export declare class ClientController {
    private clientService;
    private httpService;
    count: number;
    constructor(clientService: ClientService, httpService: HttpService);
    all(): Promise<import("./client.model").Client[]>;
    clientCreated(client: any): Promise<void>;
    clientUpdated(client: any): Promise<void>;
    clientDeleted(id: number): Promise<void>;
}
