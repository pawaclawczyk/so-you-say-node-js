import { Body, Controller, Post } from "@nestjs/common";
import { AddTask, MatrixId, Task } from "../../../../predef";

@Controller("matrix")
export class AddTaskAction {
    constructor(private readonly adder: AddTask) {}

    @Post()
    public handle(@Body() task: Task): void {
        this.adder.handle(1 as MatrixId, task);
    }
}
