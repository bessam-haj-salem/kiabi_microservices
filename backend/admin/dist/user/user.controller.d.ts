import { UserService } from './user.service';
import { ClientProxy } from '@nestjs/microservices';
export declare class UserController {
    private userService;
    private readonly client;
    constructor(userService: UserService, client: ClientProxy);
    showAllUsers(user: any): Promise<import("./user.dto").UserRO[]>;
    register(user: any): Promise<import("./user.dto").UserRO>;
    updateIdea(user: any): Promise<any>;
    delete(id: number): Promise<void>;
}
