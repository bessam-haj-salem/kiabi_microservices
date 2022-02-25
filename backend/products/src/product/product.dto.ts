import { IsInt, isInt, IsString } from "class-validator";
import { ClientRO } from "src/client/client.dto";


export class ProductDTO {

  @IsString()
  ref_product: string;

  @IsString()
  nom_product: string;

  @IsString()
  description: string;

  @IsString()
  price: string;

  @IsInt()
  clientID: number


}

export class ProductRO {
  id?: number;
  ref_product: string;

  nom_product: string;

  description: string;

  price: string;

  client: ClientRO

}
