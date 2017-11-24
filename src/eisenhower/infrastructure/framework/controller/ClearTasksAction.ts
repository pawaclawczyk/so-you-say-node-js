import { Controller, Delete, HttpCode, Inject, Param } from '@nestjs/common';
import { notFound } from '../../../../common/infrastructure/framework/controller/helper';
import { ParseIntPipe } from '../../../../common/infrastructure/framework/PareIntPipe';
import { ClearTasks } from '../../../application/use_case';
import { MatrixView } from '../../../application/view';
import { MatrixId } from '../../../model/matrix.model';
import services from '../services';

@Controller()
export class ClearTasksAction {
    constructor(@Inject(services.CLEAR_TASKS) private readonly clearTasks: ClearTasks) {}

    @Delete('/matrix/:id/tasks')
    @HttpCode(204)
    public handle(@Param('id', new ParseIntPipe()) id: MatrixId): Promise<MatrixView> {
        return this.clearTasks(id).then(MatrixView, notFound(id));
    }
}
