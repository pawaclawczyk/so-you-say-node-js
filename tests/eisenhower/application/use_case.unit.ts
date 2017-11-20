import { InMemoryRepository } from '../../../src/common/infrastructure/repository/InMemoryRepository';
import { addTask, clearTasks, createMatrix, finishTask } from '../../../src/eisenhower/application/use_case';
import { Matrix, MatrixId } from '../../../src/eisenhower/model/matrix.model';
import { createTask, TaskKinds } from '../../../src/eisenhower/model/task.model';

describe('An Eisenhower application', () => {
    it('creates matrix with id and empty task list', () => {
        const repository = new InMemoryRepository<MatrixId, Matrix>();

        const matrix = createMatrix(repository, 1);

        expect(matrix.id).toBe(1);
        expect(matrix.tasks.size()).toBe(0);
    });

    it('adds task to matrix', () => {
        const repository = new InMemoryRepository<MatrixId, Matrix>();

        createMatrix(repository, 1);

        addTask(repository, 1, 'first task');
        const matrix = addTask(repository, 1, 'second task');

        expect(matrix.tasks.size()).toEqual(2);
        expect(matrix.tasks.head()).toEqual(createTask('second task', 2));
        expect(matrix.tasks.tail().head()).toEqual(createTask('first task', 1));
    });

    it('finishes tasks', () => {
        const repository = new InMemoryRepository<MatrixId, Matrix>();

        createMatrix(repository, 1);

        addTask(repository, 1, 'first task');
        addTask(repository, 1, 'second task');

        const matrix = finishTask(repository, 1, 1);

        expect(matrix.tasks.size()).toEqual(2);
        expect(matrix.tasks.head().kind).toEqual(TaskKinds.WaitingTask);
        expect(matrix.tasks.tail().head().kind).toEqual(TaskKinds.FinishedTask);
    });

    it('removes all tasks', () => {
        const repository = new InMemoryRepository<MatrixId, Matrix>();

        createMatrix(repository, 1);

        addTask(repository, 1, 'first task');
        addTask(repository, 1, 'second task');

        const matrix = clearTasks(repository, 1);

        expect(matrix.tasks.size()).toEqual(0);
    });
});
