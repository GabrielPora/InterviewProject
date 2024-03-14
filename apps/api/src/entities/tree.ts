import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('tree')
export class Tree {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sha: string;

  @Column()
  url: string;
}
