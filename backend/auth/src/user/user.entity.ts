import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { response } from "express";
import { UserRO } from "./user.dto";
import { IdeaEntity } from "src/idea/idea.entity";
@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    created:Date

    @Column({
        type:'text',
        unique:true
    })
    username:string 

    @Column('text')
    password:string 
     
    @OneToMany(type => IdeaEntity,idea => idea.author)
    ideas: IdeaEntity[]

    @ManyToMany(type => IdeaEntity, {cascade:true})
    @JoinTable()
    bookmarks:IdeaEntity[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    toResponseObject(showToken:boolean = true):UserRO {
        const {id,created, username,token} = this
        const responseObject:any  = {id, created, username}
        if(showToken) {
            responseObject.token = token
        }

        if(this.ideas) {
            responseObject.ideas = this.ideas
        }
        if(this.bookmarks) {
            responseObject.bookmarks = this.bookmarks
        }
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