import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// import * as jwt from 'express-jwt'

import { response } from 'express';
import { UserRO } from './user.dto';
import { IdeaEntity } from 'src/idea/idea.entity';
import { ManagementClient, User } from 'auth0';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
import { HttpService } from '@nestjs/axios';
let request = require('request');
@Entity('users')
export class UserEntity {
    constructor(private httpService: HttpService) {}
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column('text')
  password: string;

  @Column('text')
  email: string;




  // @OneToMany(type => IdeaEntity,idea => idea.author)
  // ideas: IdeaEntity[]

  // @ManyToMany(type => IdeaEntity, {cascade:true})
  // @JoinTable()
  // bookmarks:IdeaEntity[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = false): UserRO {
    const { id, created, username, email, password, } = this;
    const responseObject: any = { id, created, username, email, password };
    // let newToken = process.env.TOKEN
    //     if(showToken) {
    //         responseObject.token = newToken
    //     }
        return responseObject
    
    
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
  // private get token() {
  //     const {id, username} = this

  //     return jwt.sign(
  //         {
  //             id,
  //             username
  //         },
  //         process.env.SECRET
  //     )

  // }
//   private get token() {
//     // const {id, username} = this
//     // this.httpService.post(`https://dev-ltw8h3ds.us.auth0.com/oauth/token`,'{"client_id":"8EP5OH518rsS4oJ8nAHilrLwAZBsU37a","client_secret":"_YgLoKaYzhtiGz1KslteoqvYgr8PdIj2uERn73p0v2j58vUD0DvEvlNacvConvDm","audience":"nestjs-api","grant_type":"client_credentials"}', {headers: { 'content-type': 'application/json' }}).subscribe(
//     //     response =>  {
//     //       console.log("**************res");
//     //       console.log(response)
         
//     //     // console.log(token);
//     //     }
//     //   )
// //     let options = {
// //       method: 'POST',
// //       url: 'https://dev-ltw8h3ds.us.auth0.com/oauth/token',
// //       headers: { 'content-type': 'application/json' },
// //       body: '{"client_id":"8EP5OH518rsS4oJ8nAHilrLwAZBsU37a","client_secret":"_YgLoKaYzhtiGz1KslteoqvYgr8PdIj2uERn73p0v2j58vUD0DvEvlNacvConvDm","audience":"nestjs-api","grant_type":"client_credentials"}',
// //     };
// //  let token
// //     request(options, function (error, response, body) {
// //       if (error) throw new Error(error);

// //       response = JSON.parse(response.body)
      
// //       token = response.access_token
// //     console.log(token);

// //     });

//     return response;
//   }
}
