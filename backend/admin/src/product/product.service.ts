import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product) private readonly productRepository:Repository<Product>
    ) {}


    async all():Promise<Product[]> {
        return this.productRepository.find()
    }

    async create(data):Promise<Product>{
        return this.productRepository.save(data)
    }

    async get(id: number):Promise<Product> {
        return this.productRepository.findOne({id})
    }

    async update(id:number, data): Promise<any> {
        return this.productRepository.update(id, data)
    }

    async delete(id: number): Promise<any> {
        return this.productRepository.delete(id)

    }
}
