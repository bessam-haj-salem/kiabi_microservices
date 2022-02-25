import { ClientRO } from "src/client/client.dto";
export declare class ProductDTO {
    ref_product: string;
    nom_product: string;
    description: string;
    price: string;
    clientID: number;
}
export declare class ProductRO {
    id?: number;
    ref_product: string;
    nom_product: string;
    description: string;
    price: string;
    client: ClientRO;
}
