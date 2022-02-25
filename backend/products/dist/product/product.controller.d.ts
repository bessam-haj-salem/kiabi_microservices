import { ProductDTO } from './product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    all(): Promise<import("./product.dto").ProductRO[]>;
    all1(id: number): Promise<any>;
    create(data: ProductDTO): Promise<import("./product.dto").ProductRO>;
    get(id: number): Promise<import("./product.dto").ProductRO>;
    update(id: number, data: ProductDTO): Promise<import("./product.dto").ProductRO>;
    delete(id: number): Promise<number>;
}
