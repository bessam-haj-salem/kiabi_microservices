import { ClientService } from './client.service';
export declare class ClientController {
    private clientService;
    constructor(clientService: ClientService);
    all(): Promise<import("./client.dto").ClientRO[]>;
    create(data: any): Promise<import("./client.dto").ClientRO>;
    get(id: number): Promise<import("./client.dto").ClientRO>;
    update(id: number, data: any): Promise<import("./client.dto").ClientRO>;
    delete(id: number): Promise<number>;
}
