import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
 
    constructor(private productService: ProductService, private httpService: HttpService) {}

    @Get()
    async all() {
        return this.productService.all()
    }

    @Post(':id/like')
    async like(@Param('id') id:number) {
        const product = await this.productService.findOne(id)
        this.httpService.post(`http://localhost:3000/api/products/${id}/like`,{}).subscribe(res => {
            console.log(res);
        })
        return this.productService.update(id, {
            likes: product.likes + 1
        }) 

    }
    
    @EventPattern('product_created')
    async productCreated(product: any) {
        this.productService.create({
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes

        })

    }
    @EventPattern('product_updated')
    async productUpdated(product: any) {

       await this.productService.update(product.id,{
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes

        })

    }

    @EventPattern('product_deleted')
    async productDeleted(id: number) {

       await this.productService.delete(id)

    }
}
