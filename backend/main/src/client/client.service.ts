import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './client.model';
const mongoose = require('mongoose');
const conn = mongoose.connection;
@Injectable()
export class ClientService {
  count = 0;
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async all(): Promise<Client[]> {
    let res = await this.clientModel.find().exec();
  
    return res
  }

  async create(data): Promise<Client> {
    this.count++;
    // if (this.count === 1) {
      console.log('connection closed');

      return new this.clientModel(data).save();
    // }
  }
  async findOne(id: number): Promise<Client> {
    try {
      const clientSelected = this.clientModel.findOne({ id });
      return clientSelected;
    } catch {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, data): Promise<any> {
    return this.clientModel.findOneAndUpdate({ id }, data);
  }

  async delete(id: number): Promise<void> {
    console.log(`client id to delete ${id}`);

    await this.clientModel.deleteOne({ id });
  }
}
