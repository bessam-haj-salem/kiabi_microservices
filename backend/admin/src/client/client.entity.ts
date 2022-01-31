import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
