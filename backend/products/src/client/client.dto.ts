import { IsString } from "class-validator";


export class ClientDTO {

  @IsString()
  raison_social: string;

  @IsString()
  num_sirette: string;

  @IsString()
  adresse: string;

  @IsString()
  email: string;

  @IsString()
  telephone: string;
}

export class ClientRO {
  id?: number;
  raison_social: string;

  num_sirette: string;

  adresse: string;

  email: string;

  telephone: string;
}
