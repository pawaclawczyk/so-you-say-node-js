import { List } from 'monet';
import * as R from 'ramda';
import { CurriedFunction2 } from 'ramda';
import {
    createTask, finishTask as finishSingleTask, TaskId, TaskList, TaskName,
    WaitingTask,
} from './task.model';

export type MatrixId = number;

export interface Matrix {
    id: MatrixId;
    tasks: TaskList;
}

export type MatrixConstructor = (id: MatrixId) => Matrix;

export type NextTaskId = (matrix: Matrix) => TaskId;

type AddTask = (matrix: Matrix, task: WaitingTask) => Matrix;

// Matrix => TaskName => Matrix
export type CreateAndAddTask = CurriedFunction2<Matrix, TaskName, Matrix>;

// Matrix => TaskId => Matrix
export type FinishTask = CurriedFunction2<Matrix, TaskId, Matrix>;

export type ClearTasks = (matrix: Matrix) => Matrix;

export const Matrix: MatrixConstructor = (id: MatrixId) => ({ id, tasks: List() });

export const nextTaskId: NextTaskId = (matrix: Matrix) => matrix.tasks.size() + 1;

const addTask: AddTask = (matrix: Matrix, task: WaitingTask) => ({
    id: matrix.id,
    tasks: matrix.tasks.cons(task),
});

export const createAndAddTask: CreateAndAddTask =
    R.curry((matrix: Matrix, name: TaskName) => addTask(matrix, createTask(name, nextTaskId(matrix))));

export const finishTask: FinishTask =
    R.curry(
        (matrix, id) => ({
            id: matrix.id,
            tasks: matrix
                .tasks
                .map((task) => task.id === id ? finishSingleTask(task) : task),
        }),
    );

export const removeAllTasks: ClearTasks = (matrix) => Matrix(matrix.id);
