import { Product } from 'src/product/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  raison_social: string;

  @Column()
  num_sirette: string;

  @Column()
  adresse: string;

  @Column()
  email: string;
  
  @Column()
  telephone: string;

  @OneToMany(() => Product, product => product.client)
  products: Product[];

}
