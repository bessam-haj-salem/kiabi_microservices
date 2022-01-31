import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './client.model';

@Injectable()
export class ClientService {

    constructor(
        @InjectModel(Client.name)
        private readonly clientModel: Model<ClientDocument>,
      ) {}
    
      async all(): Promise<Client[]> {
        return this.clientModel.find().exec();
      }
    
      async create(data): Promise<Client> {
        return new this.clientModel(data).save();
      }
      async findOne(id:number):Promise<Client> {
          return this.clientModel.findOne({id})
      }
    
      async update(id:number,data ): Promise<any> {
          console.log(id);
          console.log(data);
        return  this.clientModel.findOneAndUpdate({id}, data)
      }
    
      async delete(id:number ): Promise<void> {
        console.log(`client id to delete ${id}`);
       
      await  this.clientModel.deleteOne({id})
    }
    }
    
