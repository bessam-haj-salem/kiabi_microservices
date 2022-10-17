import { ClientDTO } from './client.dto';
import { ClientService } from './client.service';
export declare class ClientController {
    private clientService;
    constructor(clientService: ClientService);
    all(): Promise<import("./client.dto").ClientRO[]>;
    create(data: ClientDTO): Promise<import("./client.dto").ClientRO>;
    get(id: number): Promise<import("./client.dto").ClientRO>;
    update(id: number, raison_social: string, num_sirette: string, adresse: string, email: string, telephone: string): Promise<import("./client.dto").ClientRO>;
    delete(id: number): Promise<number>;
}
