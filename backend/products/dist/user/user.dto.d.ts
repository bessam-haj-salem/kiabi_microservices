export declare class UserDTO {
    username: string;
    password: string;
    email: string;
}
export declare class UserRO {
    id: number;
    username: string;
    email?: string;
    created: Date;
    token?: string;
}
