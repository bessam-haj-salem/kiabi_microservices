import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthorizationGuard } from './authorization/authorization.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/dog')
  getDog(): string {
    return this.appService.getDog();
  }

  @UseGuards(AuthorizationGuard)
  @Get('/cat')
  getCat(): string {
    return this.appService.getCat();
  }
}
