import { Maybe } from 'monet';
import { RepositoryGet } from '../../common/model/repository/repository';
import { Matrix, MatrixId } from '../model/matrix.model';
import { Task } from '../model/task.model';

interface MatrixView {
    id: MatrixId;
    tasks: Task[];
}

type GetMatrixView = (id: MatrixId) => Maybe<MatrixView>;

const MatrixView = (matrix: Matrix): MatrixView => ({
    id: matrix.id,
    tasks: matrix.tasks.toArray(),
});

const GetMatrixView: (repositoryGet: RepositoryGet<MatrixId, Matrix>) => GetMatrixView =
    (repositoryGet) => (id) => repositoryGet(id).map(MatrixView);

export {
    MatrixView,
    GetMatrixView,
};
