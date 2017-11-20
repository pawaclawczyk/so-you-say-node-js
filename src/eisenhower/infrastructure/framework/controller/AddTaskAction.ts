import { Body, Controller, Param, Post } from '@nestjs/common';
import { ParseIntPipe } from '../../../../common/infrastructure/framework/PareIntPipe';
import { AddTask } from '../../../application/AddTask';
import { MatrixId } from '../../../model/MatrixId';
import { Task } from '../../../model/Task';

@Controller()
export class AddTaskAction {
    constructor(private readonly adder: AddTask) {}

    @Post('/matrix/:id/tasks')
    public handle(@Param('id', new ParseIntPipe()) id: MatrixId, @Body() task: Task): void {
        this.adder.handle(id, task);
    }
}
