import { Client } from "../../dashboard/models/Client.model";

export interface Produit {
    id?: number;
    ref_product: string;
  
    nom_product: string;
  
    description: string;
  
    price: string;

    client: Client
  
}