import { Maybe } from 'monet';
import { __ } from 'ramda';
import { createConnection } from 'typeorm';
import { schemas } from './eisenhower/infrastructure/orm/scheme';
import { createAndAddTask, finishTask, Matrix } from './eisenhower/model/matrix.model';

createConnection({
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'test',
    entitySchemas: schemas,
    synchronize: true,
    logging: false,
})
    .then(async (connection) => {
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

        const result = await connection.manager.getRepository('Matrix').save(matrix);

        console.log(result);

        console.log('Matrix was saved');
    })
    .catch((error) => console.log(error));
