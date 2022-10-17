import { HttpService } from '@nestjs/axios';
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
    private httpService: HttpService,
  ) {}
  async showAll(): Promise<UserRO[]> {
    const users = await this.userRepository.find();
    console.log(users);
    return users.map(user => user.toResponseObject(false));
  }
  async login(data: UserDTO): Promise<UserRO> {
    try {
      const { username, password } = data;
      const user = await this.userRepository.findOne({ where: { username } });
      console.log(user)
      if (!user || !(await user.comparePassword(password))) {
        throw new HttpException(
          'Invalid username/password',
          HttpStatus.BAD_REQUEST,
        );
      }
      let token;
      let tokenReturn = () => {
        return new Promise((resolve, reject) => {
          this.httpService
            .post(
              `https://dev-ltw8h3ds.us.auth0.com/oauth/token`,
              `{"client_id":"${process.env.CLIENT_ID}","client_secret":"${process.env.CLIENT_SECRET}","audience":"nestjs-api","grant_type":"client_credentials"}`,
              { headers: { 'content-type': 'application/json' } },
            )
            .subscribe(response => {
              console.log('**************token');
              console.log(response.data.access_token);
              token = response.data.access_token;
              // user.token =
              resolve(token);
            });
        });
      };
      token = await tokenReturn();
      let objRes = Object.assign({
        user,
        token,
      });

      return objRes;
    } catch (err) {
      console.log(err);
    }
  }
  async register(data: UserDTO): Promise<UserRO> {
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
