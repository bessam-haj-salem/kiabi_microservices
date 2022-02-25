import { Client } from 'src/client/client.entity';
export declare class Product {
    id: number;
    created: Date;
    updated: Date;
    ref_product: string;
    nom_product: string;
    description: string;
    price: string;
    client: Client;
}
