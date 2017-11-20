import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { ParseIntPipe } from '../../../../common/infrastructure/framework/PareIntPipe';
import { ClearMatrix } from '../../../application/ClearMatrix';
import { MatrixId } from '../../../model/MatrixId';

@Controller()
export class ClearTasksAction {
    constructor(private readonly clearer: ClearMatrix) {}

    @Delete('/matrix/:id/tasks')
    @HttpCode(204)
    public handle(@Param('id', new ParseIntPipe()) id: MatrixId): void {
        this.clearer.handle(id);
    }
}
