import { Controller, Get, Inject, Param } from '@nestjs/common';
import { identity } from 'ramda';
import { notFound } from '../../../../common/infrastructure/framework/controller/helper';
import { ParseIntPipe } from '../../../../common/infrastructure/framework/PareIntPipe';
import { GetMatrixView, MatrixView } from '../../../application/view';
import { MatrixId } from '../../../model/matrix.model';
import services from '../services';

@Controller()
export class GetMatrixAction {
    constructor(@Inject(services.GET_MATRIX) private readonly getMatrix: GetMatrixView) {}

    @Get('/matrix/:id')
    public handle(@Param('id', new ParseIntPipe()) id: MatrixId): Promise<MatrixView> {
        return this.getMatrix(id).then(identity, notFound(id));
    }
}
