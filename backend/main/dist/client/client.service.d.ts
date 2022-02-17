import { Model } from 'mongoose';
import { Client, ClientDocument } from './client.model';
export declare class ClientService {
    private readonly clientModel;
    count: number;
    constructor(clientModel: Model<ClientDocument>);
    all(): Promise<Client[]>;
    create(data: any): Promise<Client>;
    findOne(id: number): Promise<Client>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<void>;
}
