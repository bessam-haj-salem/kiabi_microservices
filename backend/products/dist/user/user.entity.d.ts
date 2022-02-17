import { UserRO } from "./user.dto";
export declare class UserEntity {
    id: number;
    created: Date;
    username: string;
    password: string;
    email: string;
    hashPassword(): Promise<void>;
    toResponseObject(showToken?: boolean): UserRO;
    comparePassword(attempt: string): Promise<any>;
    private get token();
}
