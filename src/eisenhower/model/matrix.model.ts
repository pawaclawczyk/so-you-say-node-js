import { List } from 'monet';
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
export type AddTask = (matrix: Matrix, task: WaitingTask) => Matrix;
export type CreateAndAddTask = (matrix: Matrix, name: TaskName) => Matrix;

export type FinishTask = (matrix: Matrix, taskId: TaskId) => Matrix;

export type ClearTasks = (matrix: Matrix) => Matrix;

export const Matrix: MatrixConstructor = (id: MatrixId) => ({ id, tasks: List() });

export const nextTaskId: NextTaskId = (matrix: Matrix) => matrix.tasks.size() + 1;

const addTask: AddTask = (matrix: Matrix, task: WaitingTask) => ({
    id: matrix.id,
    tasks: matrix.tasks.cons(task),
});

export const createAndAddTask: CreateAndAddTask = (matrix: Matrix, name: TaskName) =>
    addTask(matrix, createTask(name, nextTaskId(matrix)));

export const finishTask: FinishTask = (matrix, id) => ({
    id: matrix.id,
    tasks: matrix
        .tasks
        .map((task) => task.id === id ? finishSingleTask(task) : task),
});

export const removeAllTasks: ClearTasks = (matrix) => Matrix(matrix.id);
