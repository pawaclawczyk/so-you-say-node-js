import { Body, Controller, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { Maybe } from 'monet';
import { ParseIntPipe } from '../../../../common/infrastructure/framework/PareIntPipe';
import { Matrix, MatrixId } from '../../../model/matrix.model';
import { TaskName } from '../../../model/task.model';
import services from '../services';

@Controller()
export class AddTaskAction {
    constructor(@Inject(services.ADD_TASK) private readonly addTask: (id: MatrixId, name: TaskName) => Maybe<Matrix>) {}

    @Post('/matrix/:id/tasks')
    public handle(@Param('id', new ParseIntPipe()) id: MatrixId, @Body() task: { name: TaskName }): void {
        this
            .addTask(id, task.name)
            .orElseRun(() => {
                throw new HttpException('Matrix not found', HttpStatus.NOT_FOUND);
            });
    }
}
