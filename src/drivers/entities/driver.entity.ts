import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  age: number;

  @Column()
  experience: string;

  @Column()
  phoneNumber: string;

  @Column()
  contractStartDate: Date;

  @Column()
  workingHoursStart: string;

  @Column()
  workingHoursEnd: string;

  @Column()
  restDays: string;

  @Column()
  taxiId: number;
}
