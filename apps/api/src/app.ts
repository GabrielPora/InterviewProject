import * as express from "express";
import { Request, Response } from "express";
import { User } from "./entities/user";
import { dataSource } from "./database/data-source";

// establish database connection
dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// create and setup express app
const app = express();
app.use(express.json());

// register routes
app.get("/users", async function (req: Request, res: Response) {
  const users = await dataSource.getRepository(User).find();
  res.json(users);
});

app.get("/users/:id", async function (req: Request, res: Response) {
  var id: number = parseInt(req.params.id);
  const results = await dataSource.getRepository(User).findOneBy({
    id: id,
  });
  return res.send(results);
});

app.post("/users", async function (req: Request, res: Response) {
  const user = await dataSource.getRepository(User).create(req.body);
  const results = await dataSource.getRepository(User).save(user);
  return res.send(results);
});

app.put("/users/:id", async function (req: Request, res: Response) {
  var id: number = parseInt(req.params.id);
  const user = await dataSource.getRepository(User).findOneBy({
    id: id,
  });
  dataSource.getRepository(User).merge(user, req.body);
  const results = await dataSource.getRepository(User).save(user);
  return res.send(results);
});

app.delete("/users/:id", async function (req: Request, res: Response) {
  const results = await dataSource.getRepository(User).delete(req.params.id);
  return res.send(results);
});

// start express server
app.listen(3000);
