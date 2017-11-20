import { createAndAddTask, finishTask, Matrix, removeAllTasks } from '../../../src/eisenhower/model/matrix.model';
import { createTask, TaskKinds } from '../../../src/eisenhower/model/task.model';

describe('An Eisenhower matrix', () => {
    it('creates matrix with id and empty task list', () => {
        const matrix = Matrix(1);

        expect(matrix.id).toBe(1);
        expect(matrix.tasks.size()).toBe(0);
    });

    it('creates and adds task to matrix', () => {
        const matrix = createAndAddTask(createAndAddTask(Matrix(1), 'first task'), 'second task');

        expect(matrix.tasks.size()).toEqual(2);
        expect(matrix.tasks.head()).toEqual(createTask('second task', 2));
        expect(matrix.tasks.tail().head()).toEqual(createTask('first task', 1));
    });

    it('finishes tasks', () => {
        const matrix = finishTask(createAndAddTask(createAndAddTask(Matrix(1), 'first task'), 'second task'), 1);

        expect(matrix.tasks.size()).toEqual(2);
        expect(matrix.tasks.head().kind).toEqual(TaskKinds.WaitingTask);
        expect(matrix.tasks.tail().head().kind).toEqual(TaskKinds.FinishedTask);
    });

    it('removes all tasks', () => {
        const matrix = removeAllTasks(createAndAddTask(createAndAddTask(Matrix(1), 'first task'), 'second task'));

        expect(matrix.tasks.size()).toEqual(0);
    });
});
