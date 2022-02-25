import { Client } from 'src/client/client.entity';
import { Repository } from 'typeorm';
import { ProductDTO, ProductRO } from './product.dto';
import { Product } from './product.entity';
export declare class ProductService {
    private productRepository;
    private clientRepository;
    connection: import("typeorm").Connection;
    constructor(productRepository: Repository<Product>, clientRepository: Repository<Client>);
    private ensureOwnerShip;
    showAll(): Promise<ProductRO[]>;
    showAll1(clientId: number): Promise<any>;
    create(clientID: number, data: ProductDTO): Promise<ProductRO>;
    read(id: number): Promise<ProductRO>;
    update(clientID: number, data: Partial<ProductDTO>): Promise<ProductRO>;
    destroy(clientID: number): Promise<number>;
}
