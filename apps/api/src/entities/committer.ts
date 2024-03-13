import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Committer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  date: Date;
}
