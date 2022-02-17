import {  IsEmpty, IsNotEmpty } from "class-validator";

export class UserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  email: string;
}

export class UserRO {
  id: number;
  username: string;
  email?: string
  created: Date;
  token?: string;
}
