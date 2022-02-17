import { ClientProxy } from '@nestjs/microservices';
import { Product } from './product.entity';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    private readonly client;
    constructor(productService: ProductService, client: ClientProxy);
    all(): Promise<Product[]>;
    create(title: string, image: string): Promise<Product>;
    get(id: number): Promise<Product>;
    update(id: number, title: string, image: string): Promise<Product>;
    delete(id: number): Promise<void>;
    like(id: number): Promise<any>;
}
