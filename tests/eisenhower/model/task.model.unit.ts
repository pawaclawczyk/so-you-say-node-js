import { Maybe } from 'monet';
import { createTask, finishTask, TaskKinds } from '../../../src/eisenhower/model/task.model';

describe('A task', () => {
    it('is created from name and id as waiting task', () => {
        const task = createTask('Some task', 123);

        expect(task.kind).toEqual(TaskKinds.WaitingTask);
        expect(task.id).toEqual(123);
        expect(task.name).toEqual('Some task');
        // @ts-ignore: done is undefined in WaitingTask
        expect(task.done).toBeUndefined();
    });

    it('is finished', () => {
        const task = Maybe.Just(createTask('Some task', 123))
            .map(finishTask)
            .just();

        expect(task.kind).toEqual(TaskKinds.FinishedTask);
        expect(task.done).toBe(true);
    });
});
