import { Controller, Get, HttpStatus, Inject, Param } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { ParseIntPipe } from '../../../../common/infrastructure/framework/PareIntPipe';
import { Repository } from '../../../../common/model/repository/repository';
import { Matrix } from '../../../model/Matrix';
import { MatrixId } from '../../../model/MatrixId';
import services from '../services';

@Controller()
export class GetMatrixAction {
    constructor(@Inject(services.MATRIX_REPOSITORY) private readonly matrices: Repository<MatrixId, Matrix>) {}

    @Get('/matrix/:id')
    public handle(@Param('id', new ParseIntPipe()) id: MatrixId): Matrix {
        const matrix = this.matrices.get(Number(id));

        matrix.orElseRun(() => {
            throw new HttpException('Matrix not found', HttpStatus.NOT_FOUND);
        });

        return matrix.just();
    }
}
