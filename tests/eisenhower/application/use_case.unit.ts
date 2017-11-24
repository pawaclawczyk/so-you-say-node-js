import { Map } from 'immutable';
import { InMemoryGet, InMemoryStore } from '../../../src/common/infrastructure/repository/InMemoryRepository';
import { AddTask, ClearTasks, CreateMatrix, FinishTask } from '../../../src/eisenhower/application/use_case';
import { Matrix, MatrixId } from '../../../src/eisenhower/model/matrix.model';
import { createTask, TaskKinds } from '../../../src/eisenhower/model/task.model';

describe('An Eisenhower application', () => {
    const MATRIX_ID = 1;

    let createMatrix: CreateMatrix;
    let addTask: AddTask;
    let finishTask: FinishTask;
    let clearTasks: ClearTasks;

    beforeEach(() => {
        const matrices = Map().asMutable() as Map<MatrixId, Matrix>;

        const get = InMemoryGet(matrices);
        const store = InMemoryStore(matrices);

        createMatrix = CreateMatrix(store);
        addTask = AddTask(get, store);
        finishTask = FinishTask(get, store);
        clearTasks = ClearTasks(get, store);
    });

    it('creates matrix with id and empty task list', async () => {
        const matrix = await createMatrix(MATRIX_ID);

        expect(matrix.id).toBe(MATRIX_ID);
        expect(matrix.tasks.size()).toBe(0);
    });

    it('adds task to matrix', async () => {
        await createMatrix(MATRIX_ID);

        await addTask(MATRIX_ID, 'first task');
        const matrix = await addTask(MATRIX_ID, 'second task');

        expect(matrix.tasks.size()).toEqual(2);
        expect(matrix.tasks.head()).toEqual(createTask('second task')(2));
        expect(matrix.tasks.tail().head()).toEqual(createTask('first task')(1));
    });

    it('finishes tasks', async () => {
        await createMatrix(MATRIX_ID);

        await addTask(MATRIX_ID, 'first task');
        await addTask(MATRIX_ID, 'second task');

        const matrix = await finishTask(MATRIX_ID, 1);

        expect(matrix.tasks.size()).toEqual(2);
        expect(matrix.tasks.head().kind).toEqual(TaskKinds.WaitingTask);
        expect(matrix.tasks.tail().head().kind).toEqual(TaskKinds.FinishedTask);
    });

    it('removes all tasks', async () => {
        await createMatrix(MATRIX_ID);

        await addTask(MATRIX_ID, 'first task');
        await addTask(MATRIX_ID, 'second task');

        const matrix = await clearTasks(MATRIX_ID);

        expect(matrix.tasks.size()).toEqual(0);
    });
});
