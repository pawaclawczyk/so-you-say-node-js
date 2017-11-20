import { List } from 'immutable';

export type TaskId = number;
export type TaskName = string;

export interface Task {
    id: TaskId;
    name: TaskName;
    done: boolean;
}

export type TaskList = List<Task>;

export interface Matrix {
    doFirst: TaskList;
    schedule: TaskList;
    delegate: TaskList;
    doNotDo: TaskList;
}

export type CreateMatrix = () => Matrix;
export type AddTask = (matrix: Matrix, taskName: TaskName) => Matrix;
export type FinishTask = (matrix: Matrix, taskId: TaskId) => Matrix;
export type ClearTasks = (matrix: Matrix) => Matrix;

export const CreateMatrix: CreateMatrix =
    () => ({
        doFirst: List(),
        schedule: List(),
        delegate: List(),
        doNotDo: List(),
    });

export const AddTask: AddTask = (matrix, taskName) => {
    const taskId = matrix.doFirst.size + matrix.schedule.size + matrix.delegate.size + matrix.doNotDo.size + 1;

    const task = {
        id: taskId,
        name: taskName,
        done: false,
    };

    const doFirst = matrix.doFirst.push(task);

    return Object.assign({}, matrix, { doFirst});
};

export const FinishTask: FinishTask = (matrix: Matrix, taskId: TaskId) => {
    const finishTaskIn = (list: TaskList): TaskList => list.map(
        (task) => (task && task.id === taskId) ? Object.assign({}, task, { done: true }) : task,
    ) as TaskList;

    return {
        doFirst: finishTaskIn(matrix.doFirst),
        schedule: finishTaskIn(matrix.schedule),
        delegate: finishTaskIn(matrix.delegate),
        doNotDo: finishTaskIn(matrix.doNotDo),
    };
};
