import { Body, Controller, Post } from "@nestjs/common";
import { AddTask } from "../../../../Application/AddTask";
import { MatrixId, Task } from "../../../../predef";

@Controller("matrix")
export class AddTaskAction {
    constructor(private readonly adder: AddTask) {}

    @Post()
    public handle(@Body() task) {
        return this.adder.handle(1 as MatrixId, task as Task);
    }
}
