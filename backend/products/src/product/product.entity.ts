import { Client } from 'src/client/client.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn() created: Date;

  @UpdateDateColumn()
  updated: Date;
  
  @Column()
  ref_product: string;

  @Column()
  nom_product: string;

  @Column()
  description: string;

  @Column()
  price: string;
  
 @ManyToOne(type => Client, client => client.products)
  client: Client;

 
}
