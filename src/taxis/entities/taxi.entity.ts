import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Taxi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marque: string;

  @Column()
  modele: string;

  @Column()
  immatriculation: string;

  @Column()
  anneeFabrication: number;
}