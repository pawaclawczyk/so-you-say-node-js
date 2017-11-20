import { Repository } from '../../common/model/repository/repository';
import {
    createAndAddTask, finishTask as finishTaskInMatrix, Matrix, MatrixId, removeAllTasks,
} from '../model/matrix.model';
import { TaskId, TaskName } from '../model/task.model';

export type CreateMatrix = (repository: Repository<MatrixId, Matrix>, id: MatrixId) => Matrix;
export type AddTask = (repository: Repository<MatrixId, Matrix>, id: MatrixId, name: TaskName) => Matrix;
export type FinishTask = (repository: Repository<MatrixId, Matrix>, id: MatrixId, taskId: TaskId) => Matrix;
export type ClearTasks = (repository: Repository<MatrixId, Matrix>, id: MatrixId) => Matrix;

export const createMatrix: CreateMatrix = (repository, id) => {
    const matrix = Matrix(id);

    repository.store(matrix);

    return matrix;
};

export const addTask: AddTask = (repository, id, name) => {
    const matrix = repository.get(id);

    const modifiedMatrix = createAndAddTask(matrix.just(), name);

    repository.store(modifiedMatrix);

    return modifiedMatrix;
};

export const finishTask: FinishTask = (repository, id, taskId) => {
    const matrix = repository.get(id);

    const modifiedMatrix = finishTaskInMatrix(matrix.just(), taskId);

    repository.store(modifiedMatrix);

    return modifiedMatrix;
};

export const clearTasks: ClearTasks = (repository, id) => {
    const matrix = repository.get(id);

    const modifiedMatrix = removeAllTasks(matrix.just());

    repository.store(modifiedMatrix);

    return modifiedMatrix;
};
