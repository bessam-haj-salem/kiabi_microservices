import { Product } from 'src/product/product.entity';
export declare class Client {
    id: number;
    raison_social: string;
    num_sirette: string;
    adresse: string;
    email: string;
    telephone: string;
    products: Product[];
}
