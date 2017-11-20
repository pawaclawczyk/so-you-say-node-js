import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { Maybe } from 'monet';
import { identity } from 'ramda';
import { notFound } from '../../../../common/infrastructure/framework/controller/helper';
import { ParseIntPipe } from '../../../../common/infrastructure/framework/PareIntPipe';
import { Matrix, MatrixId } from '../../../model/matrix.model';
import { TaskName } from '../../../model/task.model';
import services from '../services';

@Controller()
export class AddTaskAction {
    constructor(@Inject(services.ADD_TASK) private readonly addTask: (id: MatrixId, name: TaskName) => Maybe<Matrix>) {}

    @Post('/matrix/:id/tasks')
    public handle(@Param('id', new ParseIntPipe()) id: MatrixId, @Body() task: { name: TaskName }): void {
        this.addTask(id, task.name).cata(notFound(id), identity);
    }
}
