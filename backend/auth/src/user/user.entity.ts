import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { response } from "express";
import { UserRO } from "./user.dto";
import { IdeaEntity } from "src/idea/idea.entity";
import { ManagementClient, User } from 'auth0';
@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created:Date

    @Column({
        type:'text',
        unique:true
    })
    username:string 

    @Column('text')
    password:string 

    @Column('text')
    email:string 
     
    // @OneToMany(type => IdeaEntity,idea => idea.author)
    // ideas: IdeaEntity[]

    // @ManyToMany(type => IdeaEntity, {cascade:true})
    // @JoinTable()
    // bookmarks:IdeaEntity[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    toResponseObject(showToken:boolean = true):UserRO {
        const {id,created, username, email,password,token} = this
        const responseObject:any  = {id, created, username, email, password}
        // const authZero = new ManagementClient({
        //     // 3
        //     domain: process.env.AUTH0_DOMAIN,
        //     clientId: process.env.AUTH0_CLIENT_ID,
        //     clientSecret: process.env.AUTH0_CLIENT_SECRET,
        //     scope: 'read:users update:users'
        //   });
      
        //   const response = await authZero
        //     .getUser({ id: req.user.sub }) // 4
        //     .then((user: User) => {
        //       return user;
        //     })
        //     .catch(err => {
        //       return err;
        //     });
        let newToken = process.env.TOKEN
        if(showToken) {
            responseObject.token = newToken
        }

        // if(this.ideas) {
        //     responseObject.ideas = this.ideas
        // }
        // if(this.bookmarks) {
        //     responseObject.bookmarks = this.bookmarks
        // }
        return responseObject

    }

    async comparePassword(attempt: string) {

        return await bcrypt.compare(attempt, this.password)
    }
    private get token() {
        const {id, username} = this

        return jwt.sign(
            {
                id,
                username
            },
            process.env.SECRET
        )
       
    }



}