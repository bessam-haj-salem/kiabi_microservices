import { Document } from "mongoose";
export declare type ClientDocument = Client & Document;
export declare class Client {
    id: number;
    raison_social: string;
    num_sirette: string;
    adresse: string;
    email: string;
    telephone: string;
}
export declare const ClientSchema: import("mongoose").Schema<Document<Client, any, any>, import("mongoose").Model<Document<Client, any, any>, any, any, any>, any, any>;
