import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { notFound } from '../../../../common/infrastructure/framework/controller/helper';
import { ParseIntPipe } from '../../../../common/infrastructure/framework/PareIntPipe';
import { AddTask } from '../../../application/use_case';
import { MatrixView } from '../../../application/view';
import { MatrixId } from '../../../model/matrix.model';
import { TaskName } from '../../../model/task.model';
import services from '../services';

@Controller()
export class AddTaskAction {
    constructor(@Inject(services.ADD_TASK) private readonly addTask: AddTask) {
    }

    @Post('/matrix/:id/tasks')
    public handle(@Param('id', new ParseIntPipe()) id: MatrixId, @Body() task: { name: TaskName }): Promise<{}> {
        return this.addTask(id, task.name).then(MatrixView, notFound(id));
    }
}
