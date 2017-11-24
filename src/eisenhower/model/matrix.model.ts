import { List } from 'monet';
import { compose } from 'ramda';
import { createTask, finishTask, TaskId, TaskList, TaskName, WaitingTask, } from './task.model';

type MatrixId = number;

interface Matrix {
    id: MatrixId;
    tasks: TaskList;
}

type NextTaskId = (m: Matrix) => TaskId;
type AddTask = (m: Matrix) => (t: WaitingTask) => Matrix;

type MatrixConstructor = (id: MatrixId) => Matrix;
type CreateTaskFromName = (n: TaskName) => (m: Matrix) => Matrix;
type FinishTaskById = (id: TaskId) => (m: Matrix) => Matrix;
type ClearTasks = (m: Matrix) => Matrix;

const nextId: NextTaskId = (matrix) => matrix.tasks.size() + 1;

const add: AddTask = (matrix) => (task) => ({
    id: matrix.id,
    tasks: matrix.tasks.cons(task),
});

const Matrix: MatrixConstructor = (id) => ({ id, tasks: List() });

const create: CreateTaskFromName = (name) => (matrix) => compose(add(matrix), createTask(name), nextId)(matrix);

const finish: FinishTaskById = (id) => (matrix) => ({
            id: matrix.id,
            tasks: matrix
                .tasks
                .map((t) => t.id === id ? finishTask(t) : t),
        });

const clear: ClearTasks = (matrix) => Matrix(matrix.id);

export {
    MatrixId,
    Matrix,
    create,
    finish,
    clear,
};
