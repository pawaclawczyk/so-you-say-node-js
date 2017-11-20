import { Controller, Delete, HttpCode, HttpStatus, Inject, Param } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { Maybe } from 'monet';
import { ParseIntPipe } from '../../../../common/infrastructure/framework/PareIntPipe';
import { Matrix, MatrixId } from '../../../model/matrix.model';
import services from '../services';

@Controller()
export class ClearTasksAction {
    constructor(@Inject(services.CLEAR_TASKS) private readonly clearTasks: (id: MatrixId) => Maybe<Matrix>) {}

    @Delete('/matrix/:id/tasks')
    @HttpCode(204)
    public handle(@Param('id', new ParseIntPipe()) id: MatrixId): void {
        this
            .clearTasks(id)
            .orElseRun(() => {
                throw new HttpException('Matrix not found', HttpStatus.NOT_FOUND);
            });
    }
}
