import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, UsePipes,  } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { ValidationPipe } from '../shared/validation.pipe';
import { ProductDTO } from './product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

 constructor(private productService: ProductService, 
   ) {}

  @Get()
  @UseGuards(new AuthGuard())
  async all() {
    let allproducts = this.productService.showAll();
    return allproducts;
  }
  @Get('client/:id')
  // @UseGuards(new AuthGuard())
  async all1(@Param('id') id:number) {
    console.log("*******id")
    console.log(id);
    let allproducts = this.productService.showAll1(id);
    return allproducts;
  }
  @Post('add')
  @UsePipes(new ValidationPipe())
  // @UseGuards(new AuthGuard())
  async create(@Body() data: ProductDTO) {
    console.log("data new product")
    console.log(data)
     const product = await this.productService.create(data.clientID,data)
     return product

  }

  @Get(':id')
  @UseGuards(new AuthGuard())
  async get(@Param('id') id:number ){
      return this.productService.read(id)
  }

  @Put('edit/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  async update(@Param('id') id:number, data: ProductDTO) {
   await this.productService.update(id, data )
   const product = await this.productService.read(id)
   return product
   
  }

  @Delete('delete/:id')
  @UseGuards(new AuthGuard())
  async delete(@Param('id') id: number) {
    console.log(" id to delete");
    console.log(id)
    await this.productService.destroy(id)
   return id

  }
  



}

