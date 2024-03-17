import { Request, Response } from "express";
import { Commit } from "../entities/commit";
import { dataSource } from "../database/data-source";
import { GitApiUrlParam } from "../interfaces/owner";
import { Octokit } from "octokit";

const commitRepository = dataSource.getRepository(Commit);

export class CommitController {
  async getAllCommits(req: Request, res: Response) {
    const commit = await commitRepository.find();
    res.json(commit);
  }

  async getCommitById(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const commit = await commitRepository.findOneBy({ id });
    const commitTest = await commitRepository.findOne({
      where: { id },
      //   relations: { author: true },
    });

    if (!commit) {
      res.status(404).send("Commit not found");
    } else {
      res.json(commit);
    }
  }

  async populateDB(req: Request, res: Response) {
    const queryString = JSON.stringify(req.query);
    const json = JSON.parse(queryString);
    const gitApiUrlParam: GitApiUrlParam = {
      owner: json.owner,
      repos: json.repos,
    };
    const owner = gitApiUrlParam.owner
      ? gitApiUrlParam.owner
      : process.env.OWNER;
    const repos = gitApiUrlParam.repos
      ? gitApiUrlParam.repos
      : process.env.REPOS;

    const octokit = new Octokit({
      auth: process.env.TOKEN,
    });

    let results = await octokit.request("GET /repos/{owner}/{repo}/commits", {
      owner: owner,
      repo: repos,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    let commitArr: Commit[] = [];
    if (results !== null && results !== undefined) {
      results.data.forEach((element) => {
        const url = new URL(element.commit.url);
        let elm = Object.assign(new Commit(), {
          author: element.commit.author,
          committer: element.commit.committer,
          message: element.commit.message,
          comment_count: element.commit.comment_count,
          verification: element.commit.verification,
          url: url.toString(),
          tree: element.commit.tree,
        });
        commitArr.push(elm);
      });
    }

    const newCommit = commitRepository.create(commitArr);

    try {
      await commitRepository.save(newCommit);
      res.status(201).json(newCommit);
    } catch (error) {
      res.status(400).send("Failed to create commit");
    }
  }

  async favoriteCommitUpdate(req: Request, res: Response) {
    const queryString = JSON.stringify(req.query);
    const json = JSON.parse(queryString);
    if (json.id === null || Number.isNaN(json.id) || json.favorite === undefined) {
      res.status(400).send("Missing User ID or favorite not set");
      return;
    }
    const id = parseInt(json.id);
    const favorite: boolean = JSON.parse(json.favorite);
    let repoToUpdate = await commitRepository.findOneBy({ id });
    if (!repoToUpdate) {
      res.status(404).send("Repo does not exist");
      return;
    }

    try {
      await commitRepository
        .createQueryBuilder()
        .update(Commit)
        .set({ favorite: favorite })
        .where("id = :id", { id })
        .execute();
      res.status(200).send("Commit favorite");
    } catch (error) {
      res.status(400).send("Failed to favorite commit");
    }
  }

  async updateCommit(req: Request, res: Response) {
    const repoId = parseInt(req.params.id);
    const updatedCommit = req.body;

    try {
      await commitRepository.update(repoId, updatedCommit);
      res.status(200).send("Commit updated");
    } catch (error) {
      res.status(400).send("Failed to update commit");
    }
  }

  async deleteCommit(req: Request, res: Response) {
    const repoId = parseInt(req.params.id);

    try {
      await commitRepository.delete(repoId);
      res.status(204).send("Commit deleted");
    } catch (error) {
      res.status(400).send("Failed to delete commit");
    }
  }
}
