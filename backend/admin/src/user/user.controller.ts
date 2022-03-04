import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
// import {ValidationPipe} from "../shared/validation.pipe"
// import { AuthGuard } from '../shared/auth.guard';
import { User } from './user.decorator';
import { ClientProxy, EventPattern } from '@nestjs/microservices';


@Controller('api/users')
export class UserController {
  constructor(private userService: UserService, @Inject('CLIENT_SERVICE') private readonly client: ClientProxy) {}

  @Get()
  // @UseGuards(new AuthGuard())
  showAllUsers(@User('username') user) {
      console.log(user)
    return this.userService.showAll();
  }
//   showAllUsers() {
//   return this.userService.showAll();
// }
 

  @EventPattern('user_created')
  // @UsePipes(new ValidationPipe())
  async register(user:any) {
    console.log("************************ user***************");
    console.log(user);
    const newuser = await this.userService.register(user);
    // this.client.emit('user_created', user)
    return newuser
  }

  // user consumed from rabbitmq krakend
  // @EventPattern('Zaama')
  // async create( user) {
  //   console.log("***********newuser")
  //    console.log(user);

  // }

  @EventPattern('user_updated')
  async updateIdea(user:any){
        console.log(user);
        const newuser = await this.userService.update(user.id, user)
        // this.client.emit('user_updated', user)
        return newuser
    }


    @EventPattern('user_deleted')
  async delete( id: number) {
    await this.userService.delete(id)
    // this.client.emit('user_deleted', id)

  }
}
