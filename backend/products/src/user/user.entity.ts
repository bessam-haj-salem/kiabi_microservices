import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { response } from "express";
import { UserRO } from "./user.dto";
@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created:Date

    @Column('text')
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
        const {id,created, username, email,token} = this
        const responseObject:any  = {id, created, username, email}
        if(showToken) {
            responseObject.token = token
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