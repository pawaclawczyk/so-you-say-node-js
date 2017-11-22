import { Maybe } from 'monet';
import { clear, create, finish, Matrix } from '../../../src/eisenhower/model/matrix.model';
import { createTask, TaskKinds } from '../../../src/eisenhower/model/task.model';

describe('An Eisenhower matrix', () => {
    const empty = Maybe.Just(1).map(Matrix);
    const withTwoTasks = empty.map(create('first task')).map(create('second task'));

    it('creates matrix with id and empty task list', () => {
        const matrix = Matrix(1);

        expect(matrix.id).toBe(1);
        expect(matrix.tasks.size()).toBe(0);
    });

    it('creates and adds task to matrix', () => {
        const matrix = empty
            .map(create('first task'))
            .map(create('second task'))
            .just();

        expect(matrix.tasks.size()).toEqual(2);
        expect(matrix.tasks.head()).toEqual(createTask('second task')(2));
        expect(matrix.tasks.tail().head()).toEqual(createTask('first task')(1));
    });

    it('finishes tasks', () => {
        const matrix = withTwoTasks
            .map(finish(1))
            .just();

        expect(matrix.tasks.size()).toEqual(2);
        expect(matrix.tasks.head().kind).toEqual(TaskKinds.WaitingTask);
        expect(matrix.tasks.tail().head().kind).toEqual(TaskKinds.FinishedTask);
    });

    it('removes all tasks', () => {
        const matrix = withTwoTasks
            .map(clear)
            .just();

        expect(matrix.tasks.size()).toEqual(0);
    });
});
