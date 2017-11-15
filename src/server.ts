import * as bodyParser from "body-parser";
import * as express from "express";
import { Request, Response } from "express";
import { AddTask, ClearMatrix, MatrixId, SingleMatrixInMemoryRepository, Task } from "./Eisenhower/Predef";

const app = express();

app.use(bodyParser.json());

const hello = (name: string) => "Hello, " + name + "!";

const matrixRepository = new SingleMatrixInMemoryRepository();
const addMatrix = new AddTask(matrixRepository);
const clearMatrix = new ClearMatrix(matrixRepository);

app.get("/", (req: Request, res: Response) => res.send("Homepage"));

app.get("/hello/:name", (req: Request, res: Response) => res.send(hello(req.params.name)));

app.get("/matrix", (req: Request, res: Response) => res.send(matrixRepository.get(1 as MatrixId)));

app.post("/matrix", (req: Request, res: Response) => {
    addMatrix.handle(1 as MatrixId, req.body as Task);

    res.status(201).send();
});

app.delete("/matrix", (req: Request, res: Response) => {
    clearMatrix.handle(1 as MatrixId);

    res.status(204).send();
});

app.listen(process.env.PORT || 3000);

export { app };
