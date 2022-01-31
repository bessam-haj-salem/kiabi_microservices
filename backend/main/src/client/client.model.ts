import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ClientDocument = Client & Document

@Schema()
export class Client {

    @Prop()
    id: number

    @Prop()
  raison_social: string;

  @Prop()
  num_sirette: string;

  @Prop()
  adresse: string;

  @Prop()
  email: string;
  
  @Prop()
  telephone: string;




}


export const ClientSchema=  SchemaFactory.createForClass(Client)