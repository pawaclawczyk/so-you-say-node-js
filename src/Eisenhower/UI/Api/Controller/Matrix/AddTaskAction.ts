import { Body, Controller, Dependencies, HttpStatus, Post, Res } from "@nestjs/common";
import { AddTask } from "../../../../Application/AddTask";
import { MatrixId, Task } from "../../../../predef";

@Controller("matrix")
@Dependencies(AddTask)
export class AddTaskAction {
    constructor(
        private adder: AddTask,
    ) {}

    @Post()
    public handle(@Res() response, @Body() task) {
        this.adder.handle(1 as MatrixId, task as Task);

        response
            .status(HttpStatus.CREATED)
            .json(task);
    }
}
