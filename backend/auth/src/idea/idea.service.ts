import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import {createConnection, Connection} from "typeorm";

import { InjectRepository } from '@nestjs/typeorm';

// const connection = require('../../ormconfig.json');

import { getConnection, getConnectionManager, getManager, Repository } from 'typeorm';
import { IdeaDTO, IdeaRO } from './idea.dto';
import { IdeaEntity } from './idea.entity';
import { UserEntity } from 'src/user/user.entity';
import { User } from 'src/user/user.decorator';

@Injectable()
export class IdeaService {
  connection = getConnection();
  constructor(
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
    @InjectRepository(UserEntity)
    private userRepository:Repository<UserEntity>
  ) {}
     
  //   private ensureOwnerShip(idea:IdeaEntity,userId:number) {
  //     if(idea.author.id !== userId) {
  //       throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED)
  //     }

  //   }

  // toResponseObject(idea:IdeaEntity):IdeaRO {
  //   if(idea.author !== null) {
  //     return {...idea, author:idea.author.toResponseObject(false)  }

  //   }
  // }

  // async showAll(): Promise<IdeaRO[]>{
  //   const ideas = await this.ideaRepository.find({relations: ['author']})
  //     return ideas.map(idea => this.toResponseObject(idea))
  // // return  await this.connection.query("SELECT * FROM idea")

  // }

  // async create(userId:string, data: IdeaDTO):Promise<IdeaRO>{
  //   const user = await this.userRepository.findOne({where: {id:userId}})
  //     const idea =await this.ideaRepository.create({...data, author:user})
  //     await this.ideaRepository.save(idea)
  //     return this.toResponseObject(idea)
  // }

  // async read(id:string): Promise<IdeaRO> {
  //   Logger.log(id)
  //     const idea =  await this.ideaRepository.findOne({where: {id}, relations:['author']})
      

  //     if(!idea) {
  //       throw new HttpException('Not found',HttpStatus.NOT_FOUND)
  //     }
  //     return this.toResponseObject(idea)
  // }

  // async update(id:string,userId: number, data:Partial<IdeaDTO>): Promise<IdeaRO>{
  //   let idea = await this.ideaRepository.findOne({where:{id}, relations:['author']})
  //   Logger.log(idea)
  //   if(!idea) {
  //     throw new HttpException('Not found', HttpStatus.NOT_FOUND)
  //   }
  //   this.ensureOwnerShip(idea,userId)
  //     await this.ideaRepository.update({id}, data)
  //   idea = await this.ideaRepository.findOne({where:{id}, relations:['author']})

  //     return this.toResponseObject(idea)
  // }

  // async destroy(id:string, userId){
  //   const idea = await this.ideaRepository.findOne({where:{id}, relations:['author']})
  //   if(!idea) {
  //     throw new HttpException('Not found', HttpStatus.NOT_FOUND)
  //   } 
  //     await this.ideaRepository.delete({id})
  //     return this.toResponseObject(idea)
  // }
}
