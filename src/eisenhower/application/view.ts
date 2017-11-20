import { Maybe } from 'monet';
import { getFromRepository, Repository } from '../../common/model/repository/repository';
import { Matrix, MatrixId } from '../model/matrix.model';
import { Task } from '../model/task.model';

export interface MatrixView {
    id: MatrixId;
    tasks: Task[];
}

export const matrixView = (matrix: Matrix): MatrixView => ({
    id: matrix.id,
    tasks: matrix.tasks.toArray(),
});

export type GetMatrix =
    (repository: Repository<MatrixId, Matrix>) =>
        (id: MatrixId) => Maybe<MatrixView>;

export const getMatrix: GetMatrix =
    (repository) =>
        (id) => getFromRepository(repository)(id)
            .map(matrixView);
