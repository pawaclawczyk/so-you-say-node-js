import { Maybe } from 'monet';
import { getFromRepository, Repository } from '../../common/model/repository/repository';
import { Matrix, MatrixId } from '../model/matrix.model';
import { Task } from '../model/task.model';

interface MatrixView {
    id: MatrixId;
    tasks: Task[];
}

type GetMatrix = (id: MatrixId) => Maybe<MatrixView>;

const matrixView = (matrix: Matrix): MatrixView => ({
    id: matrix.id,
    tasks: matrix.tasks.toArray(),
});

const getMatrix: (repository: Repository<MatrixId, Matrix>) => GetMatrix =
    (repository) =>
        (id) => getFromRepository(repository)(id)
            .map(matrixView);

export {
    MatrixView,
    GetMatrix,
    getMatrix,
};
