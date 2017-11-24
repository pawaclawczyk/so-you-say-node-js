import { compose } from 'ramda';
import { RepositoryGet, RepositoryStore } from '../../common/model/repository/repository';
import { clear, create, finish, Matrix, MatrixId } from '../model/matrix.model';
import { TaskId, TaskName } from '../model/task.model';

type MatrixGet = RepositoryGet<MatrixId, Matrix>;
type MatrixStore = RepositoryStore<MatrixId, Matrix>;

export type CreateMatrix = (id: MatrixId) => Promise<Matrix>;
export type AddTask = (id: MatrixId, name: TaskName) => Promise<Matrix>;
export type FinishTask = (id: MatrixId, taskId: TaskId) => Promise<Matrix>;
export type ClearTasks = (id: MatrixId) => Promise<Matrix>;

export const CreateMatrix: (store: MatrixStore) => CreateMatrix = (store) => compose(store, Matrix);

export const AddTask: (get: MatrixGet, store: MatrixStore) => AddTask =
    (get, store) => (id, name) => get(id).then(compose(store, create(name)));

export const FinishTask: (get: MatrixGet, store: MatrixStore) => FinishTask =
    (get, store) => (id, taskId) => get(id).then(compose(store, finish(taskId)));

export const ClearTasks: (get: MatrixGet, store: MatrixStore) => ClearTasks =
    (get, store) => (id) => get(id).then(compose(store, clear));
