import { Maybe } from 'monet';
import { __ } from 'ramda';
import { createConnection } from 'typeorm';
import { createAndAddTask, finishTask, Matrix } from './eisenhower/model/matrix.model';

const matrix = Maybe.Just(1)
    .map(Matrix)
    .map(createAndAddTask(__, 'first task'))
    .map(createAndAddTask(__, 'second task'))
    .map(createAndAddTask(__, 'third task'))
    .map(finishTask(__, 2))
    .map((m) => ({
        id: m.id,
        tasks: m.tasks.toArray(),
    }))
    .just();

createConnection()
    .then(async (connection) => {
        const repository = connection.manager.getRepository('Matrix');

        const res0 = await repository.save(matrix);

        console.log(res0);

        const res1 = await repository.findOne({ where: { id: 1 }, relations: ['tasks'] });

        console.log(res1);

        connection.close();
    })
    .catch((error) => console.log(error));
