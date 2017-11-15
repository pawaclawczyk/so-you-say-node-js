import { Body, Controller, Delete, Dependencies, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { AddTask, ClearMatrix, MatrixId, MatrixRepository, Task } from "../Eisenhower/predef";

@Controller("matrix")
@Dependencies("MatrixRepository", AddTask, ClearMatrix)
export class MatrixController {
    constructor(
        private repository: MatrixRepository,
        private addTask: AddTask,
        private clearMatrix: ClearMatrix,
    ) {}

    @Get()
    public getMatrix(@Res() res) {
        res.status(HttpStatus.OK).json(this.repository.get(1 as MatrixId));
    }

    @Post()
    public postMatrix(@Res() res, @Body() task) {
        this.addTask.handle(1 as MatrixId, task as Task);

        res.sendStatus(HttpStatus.CREATED);
    }

    @Delete()
    public deleteMatrix(@Res() res) {
        this.clearMatrix.handle(1 as MatrixId);

        res.sendStatus(HttpStatus.NO_CONTENT);
    }
}
