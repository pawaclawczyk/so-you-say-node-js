import * as bodyParser from "body-parser";
import * as express from "express";
import { Request, Response } from "express";
import { Empty } from "./Eisenhower/Model/Matrix";
import { Task } from "./Eisenhower/Model/Task";

const app = express();

app.use(bodyParser.json());

const hello = (name: string) => "Hello, " + name + "!";
let matrix = Empty();

app.get("/", (req: Request, res: Response) => res.send("Homepage"));

app.get("/hello/:name", (req: Request, res: Response) => res.send(hello(req.params.name)));

app.get("/matrix", (req: Request, res: Response) => res.send(matrix));

app.post("/matrix", (req: Request, res: Response) => {
    const task: Task = req.body;

    matrix = matrix.add(task);

    res.send(matrix);
});

app.delete("/matrix", (req: Request, res: Response) => {
    matrix = Empty();

    res.send(matrix);
});

app.listen(process.env.PORT || 3000);

export { app, matrix };
