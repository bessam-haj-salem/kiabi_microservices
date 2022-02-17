import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO, UserRO } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async showAll(): Promise<UserRO[]> {
    const users = await this.userRepository.find();
    console.log(users);
    return users.map(user => user.toResponseObject(false));
  }
 
  async register(data: UserDTO): Promise<UserRO> {
    console.log(data);
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject();
  }
  async get(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ id });
  }
  async update(id: number, data): Promise<any> {
    let user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User dont exists', HttpStatus.BAD_REQUEST);
    }
    await this.userRepository.update(id, data);
    return user.toResponseObject();
  }
  async delete(id: number): Promise<any> {
    let user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User dont exists', HttpStatus.BAD_REQUEST);
    }
    await this.userRepository.delete(id);
    return user.toResponseObject();
  }
}
