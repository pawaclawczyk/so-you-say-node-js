import { Controller, Get, HttpStatus, Inject, Param } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { Maybe } from 'monet';
import { ParseIntPipe } from '../../../../common/infrastructure/framework/PareIntPipe';
import { MatrixView } from '../../../application/view';
import { MatrixId } from '../../../model/matrix.model';
import services from '../services';

@Controller()
export class GetMatrixAction {
    constructor(@Inject(services.GET_MATRIX) private readonly getMatrix: (id: MatrixId) => Maybe<MatrixView>) {}

    @Get('/matrix/:id')
    public handle(@Param('id', new ParseIntPipe()) id: MatrixId): MatrixView {
        const matrix = this.getMatrix(id);

        matrix.orElseRun(() => {
            throw new HttpException('Matrix not found', HttpStatus.NOT_FOUND);
        });

        return matrix.just();
    }
}
