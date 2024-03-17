import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Commit } from "./commit";

@Entity("repocommit", { schema: "github" })
export class RepoCommit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sha: string;

  @Column()
  url: string;

  @Column()
  html_url: string;

  @Column()
  comments_url: string;

  @Column()
  node_id: string;

  @OneToOne(() => Commit, (commit) => commit.id)
  @JoinColumn({ name: "commit_id" })
  commits: Commit;
}
