import { Maybe } from 'monet';
import { __ } from 'ramda';
import { getFromRepository, Repository, storeInRepository } from '../../common/model/repository/repository';
import {
    createAndAddTask, finishTask as finishTaskInMatrix, Matrix, MatrixId, removeAllTasks,
} from '../model/matrix.model';
import { TaskId, TaskName } from '../model/task.model';

export type CreateMatrix =
    (repository: Repository<MatrixId, Matrix>) =>
        (id: MatrixId) =>
            Maybe<Matrix>;

export type AddTask =
    (repository: Repository<MatrixId, Matrix>) =>
        (id: MatrixId, name: TaskName) =>
            Maybe<Matrix>;

export type FinishTask =
    (repository: Repository<MatrixId, Matrix>) =>
        (id: MatrixId, taskId: TaskId) =>
            Maybe<Matrix>;

export type ClearTasks =
    (repository: Repository<MatrixId, Matrix>) =>
        (id: MatrixId) =>
            Maybe<Matrix>;

export const createMatrix: CreateMatrix =
    (repository) =>
        (id) =>
            Maybe.Just(id)
                .map(Matrix)
                .flatMap(storeInRepository(repository));

export const addTask: AddTask =
    (repository) =>
        (id, name) =>
            getFromRepository(repository)(id)
                .map(createAndAddTask(__, name))
                .flatMap(storeInRepository(repository));

export const finishTask: FinishTask =
    (repository) =>
        (id, taskId) =>
            getFromRepository(repository)(id)
                .map(finishTaskInMatrix(__, taskId))
                .flatMap(storeInRepository(repository));

export const clearTasks: ClearTasks =
    (repository) =>
        (id) =>
            getFromRepository(repository)(id)
                .map(removeAllTasks)
                .flatMap(storeInRepository(repository));
