import { HttpException, HttpStatus, Injectable, Logger, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/client/client.entity';
import { getConnection, Repository } from 'typeorm';
import { ProductDTO, ProductRO } from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    connection = getConnection();
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Client)
    private clientRepository:Repository<Client>
  ) {}
     
    private ensureOwnerShip(product:Product,clientId:number) {
      if(product.client.id !== clientId) {
        throw new HttpException('Incorrect client', HttpStatus.UNAUTHORIZED)
      }

    }

//   toResponseObject(product:Product):ProductRO {
//     if(product.client !== null) {
//       return {...product, client:product.client.toResponseObject(false)  }

//     }
//   }

  async showAll(): Promise<ProductRO[]>{
    const products = await this.productRepository.find({relations: ['client']})
      return products


  }
  async showAll1(clientId: number): Promise<any>{
    // const products = await this.productRepository.find()
    const products = await this.connection.query(`SELECT ref_product, nom_product, description, price, clientId FROM product WHERE clientId = ${clientId} `)
      return products


  }

  async create(clientID:number, data: ProductDTO):Promise<ProductRO>{
    const client = await this.clientRepository.findOne({where: {id:clientID}})
    console.log("notre client*******")
    console.log(client);
      const product =await this.productRepository.create({...data, client:client})
      const created = await this.productRepository.save(product)
      return created
  }

  async read(id:number): Promise<ProductRO> {
    Logger.log(id)
      const product =  await this.productRepository.findOne({where: {id}, relations:['client']})
      

      if(!product) {
        throw new HttpException('Not found',HttpStatus.NOT_FOUND)
      }
      return product
  }

  async update(clientID: number, data:Partial<ProductDTO>): Promise<ProductRO>{
    let product = await this.productRepository.findOne({where:{clientID}, relations:['client']})
    Logger.log(product)
    if(!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    this.ensureOwnerShip(product,clientID)
      await this.productRepository.update(clientID, data)
    product = await this.productRepository.findOne({where:{clientID}, relations:['client']})

      return product
  }

  async destroy(clientID:number){
    const product = await this.productRepository.findOne({where:{clientID}, relations:['client']})
    if(!product) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    } 
      await this.productRepository.delete(clientID)
      return clientID
  }
}


