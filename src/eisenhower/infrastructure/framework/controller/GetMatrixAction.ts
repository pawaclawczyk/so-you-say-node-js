import { Controller, Get, Inject, Param } from '@nestjs/common';
import { identity } from 'ramda';
import { notFound } from '../../../../common/infrastructure/framework/controller/helper';
import { ParseIntPipe } from '../../../../common/infrastructure/framework/PareIntPipe';
import { GetMatrix, MatrixView } from '../../../application/view';
import { MatrixId } from '../../../model/matrix.model';
import services from '../services';

@Controller()
export class GetMatrixAction {
    constructor(@Inject(services.GET_MATRIX) private readonly getMatrix: GetMatrix) {}

    @Get('/matrix/:id')
    public handle(@Param('id', new ParseIntPipe()) id: MatrixId): MatrixView {
        return this.getMatrix(id).cata(notFound(id), identity);
    }
}
