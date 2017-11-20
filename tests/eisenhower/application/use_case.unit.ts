import { InMemoryRepository } from '../../../src/common/infrastructure/repository/InMemoryRepository';
import { Repository } from '../../../src/common/model/repository/repository';
import { addTask, clearTasks, createMatrix, finishTask } from '../../../src/eisenhower/application/use_case';
import { Matrix, MatrixId } from '../../../src/eisenhower/model/matrix.model';
import { createTask, TaskKinds } from '../../../src/eisenhower/model/task.model';

describe('An Eisenhower application', () => {
    const MATRIX_ID = 1;

    let repository: Repository<MatrixId, Matrix>;

    beforeEach(() => {
        repository = new InMemoryRepository<MatrixId, Matrix>();
    });

    it('creates matrix with id and empty task list', () => {
        const matrix = createMatrix(repository)(MATRIX_ID).just();

        expect(matrix.id).toBe(MATRIX_ID);
        expect(matrix.tasks.size()).toBe(0);
    });

    it('adds task to matrix', () => {
        createMatrix(repository)(MATRIX_ID);

        addTask(repository)(MATRIX_ID, 'first task');
        const matrix = addTask(repository)(MATRIX_ID, 'second task').just();

        expect(matrix.tasks.size()).toEqual(2);
        expect(matrix.tasks.head()).toEqual(createTask('second task', 2));
        expect(matrix.tasks.tail().head()).toEqual(createTask('first task', 1));
    });

    it('finishes tasks', () => {
        createMatrix(repository)(MATRIX_ID);

        addTask(repository)(MATRIX_ID, 'first task');
        addTask(repository)(MATRIX_ID, 'second task');

        const matrix = finishTask(repository)(MATRIX_ID, 1).just();

        expect(matrix.tasks.size()).toEqual(2);
        expect(matrix.tasks.head().kind).toEqual(TaskKinds.WaitingTask);
        expect(matrix.tasks.tail().head().kind).toEqual(TaskKinds.FinishedTask);
    });

    it('removes all tasks', () => {
        createMatrix(repository)(MATRIX_ID);

        addTask(repository)(MATRIX_ID, 'first task');
        addTask(repository)(MATRIX_ID, 'second task');

        const matrix = clearTasks(repository)(MATRIX_ID).just();

        expect(matrix.tasks.size()).toEqual(0);
    });
});
