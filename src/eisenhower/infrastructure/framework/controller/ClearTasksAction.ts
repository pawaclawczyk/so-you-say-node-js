import { Controller, Delete, HttpCode, Inject, Param } from '@nestjs/common';
import { Maybe } from 'monet';
import { identity } from 'ramda';
import { notFound } from '../../../../common/infrastructure/framework/controller/helper';
import { ParseIntPipe } from '../../../../common/infrastructure/framework/PareIntPipe';
import { Matrix, MatrixId } from '../../../model/matrix.model';
import services from '../services';

@Controller()
export class ClearTasksAction {
    constructor(@Inject(services.CLEAR_TASKS) private readonly clearTasks: (id: MatrixId) => Maybe<Matrix>) {}

    @Delete('/matrix/:id/tasks')
    @HttpCode(204)
    public handle(@Param('id', new ParseIntPipe()) id: MatrixId): void {
        this.clearTasks(id).cata(notFound(id), identity);
    }
}
