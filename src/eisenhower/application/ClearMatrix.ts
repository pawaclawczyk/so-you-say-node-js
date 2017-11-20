import { Component, Inject } from '@nestjs/common';
import { Repository } from '../../common/model/repository/repository';
import services from '../infrastructure/framework/services';
import { Matrix } from '../model/Matrix';
import { MatrixId } from '../model/MatrixId';

@Component()
export class ClearMatrix {
    constructor(@Inject(services.MATRIX_REPOSITORY) private readonly repository: Repository<MatrixId, Matrix>) {}

    public handle(id: MatrixId): void {
        this
            .repository
            .get(id)
            .map((m) => m.clear())
            .forEach((m) => this.repository.store(m));
    }
}
