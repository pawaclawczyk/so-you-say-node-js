import { List } from 'monet';

export type TaskId = number;
export type TaskName = string;
export type Done = true;

export enum TaskKinds {
    WaitingTask = 'WaitingTask',
    FinishedTask = 'FinishedTask',
}

export interface WaitingTask {
    kind: TaskKinds.WaitingTask;
    id: TaskId;
    name: TaskName;
}

export interface FinishedTask {
    kind: TaskKinds.FinishedTask;
    id: TaskId;
    name: TaskName;
    done: Done;
}

export type Task = WaitingTask | FinishedTask;

export type TaskList = List<Task>;

export type CreateTask = (name: TaskName) => (id: TaskId) => WaitingTask;
export type FinishTask = (task: Task) => FinishedTask;

export const createTask: CreateTask = (name) => (id) => ({
    kind: TaskKinds.WaitingTask,
    id,
    name,
});

export const finishTask: FinishTask = (task) =>
    task.kind === TaskKinds.WaitingTask
        ? {
            kind: TaskKinds.FinishedTask,
            id: task.id,
            name: task.name,
            done: true,
        }
        : task;
