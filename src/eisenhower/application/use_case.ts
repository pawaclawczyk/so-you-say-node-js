import { Maybe } from 'monet';
import { RepositoryGet, RepositoryStore } from '../../common/model/repository/repository';
import { clear, create, finish, Matrix, MatrixId } from '../model/matrix.model';
import { TaskId, TaskName } from '../model/task.model';

type MatrixGet = RepositoryGet<MatrixId, Matrix>;
type MatrixStore = RepositoryStore<MatrixId, Matrix>;

export type CreateMatrix = (id: MatrixId) => Maybe<Matrix>;
export type AddTask = (id: MatrixId, name: TaskName) => Maybe<Matrix>;
export type FinishTask = (id: MatrixId, taskId: TaskId) => Maybe<Matrix>;
export type ClearTasks = (id: MatrixId) => Maybe<Matrix>;

export const CreateMatrix: (store: MatrixStore) => CreateMatrix =
    (store) => (id) => Maybe.Just(id).map(Matrix).flatMap(store);

export const AddTask: (get: MatrixGet, store: MatrixStore) => AddTask =
    (get, store) => (id, name) => get(id).map(create(name)).flatMap(store);

export const FinishTask: (get: MatrixGet, store: MatrixStore) => FinishTask =
    (get, store) => (id, taskId) => get(id).map(finish(taskId)).flatMap(store);

export const ClearTasks: (get: MatrixGet, store: MatrixStore) => ClearTasks =
    (get, store) => (id) => get(id).map(clear).flatMap(store);
