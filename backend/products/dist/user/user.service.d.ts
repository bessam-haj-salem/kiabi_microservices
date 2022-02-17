import { Repository } from 'typeorm';
import { UserDTO, UserRO } from './user.dto';
import { UserEntity } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    showAll(): Promise<UserRO[]>;
    register(data: UserDTO): Promise<UserRO>;
    get(id: number): Promise<UserEntity>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<any>;
}
