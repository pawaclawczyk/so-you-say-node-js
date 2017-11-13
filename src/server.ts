import * as express from "express";
import { Request, Response } from "express"

const app = express();

const hello = (name: string) => 'Hello, ' + name + '!';

app.get('/', (req: Request, res: Response) => res.send('Homepage'));

app.get('/hello/:name', (req: Request, res: Response) => res.send(hello(req.params.name)));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
