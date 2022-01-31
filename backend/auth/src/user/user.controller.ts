import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import {ValidationPipe} from "../shared/validation.pipe"
import { AuthGuard } from '../shared/auth.guard';
import { User } from './user.decorator';


@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api/users')
  // @UseGuards(new AuthGuard())
  // showAllUsers(@User('username') user) {
  //     console.log(user)
  //   return this.userService.showAll();
  // }
  showAllUsers() {
  return this.userService.showAll();
}
  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data:UserDTO) {
    return this.userService.register(data);
  }
}
