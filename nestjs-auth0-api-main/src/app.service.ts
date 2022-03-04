import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getDog(): string {
    return 'I am a dog, please pet me!';
  }

  getCat(): string {
    return 'I am a cat, please let me sleep!';
  }
}
