import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import {ValidationPipe} from "../shared/validation.pipe"
import { AuthGuard } from '../shared/auth.guard';
import { User } from './user.decorator';
import { ClientProxy } from '@nestjs/microservices';
import 'dotenv/config' 


@Controller('api/users')
export class UserController {
  constructor(private userService: UserService, @Inject('CLIENT_SERVICE') private readonly client: ClientProxy,
  @Inject('PRODUCT_SERVICE') private readonly client1: ClientProxy) {}

  @Get()
  // @UseGuards(new AuthGuard())
  showAllUsers(@User('username') user) {
      console.log(user)
    return this.userService.showAll();
  }
//   showAllUsers() {
//   return this.userService.showAll();
// }
  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    console.log(data);
    return this.userService.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() data:UserDTO) {
    console.log(data);
    const user = await this.userService.register(data);
    this.client.emit('user_created', user)
    this.client1.emit('user_created', user)

    return user
  }

  @Put('update/:id')
  async updateIdea(@Param('id') id:number,@Body() data: Partial<UserDTO>){

        const user = await this.userService.get(id)
        const newuser = await this.userService.update(id,data)
        console.log(newuser);
        this.client.emit('user_updated', data)
        return user
    }
  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    await this.userService.delete(id)
    this.client.emit('user_deleted', id)

  }
}
