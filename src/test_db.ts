import { Maybe, Validation } from 'monet';
import { __ } from 'ramda';
import * as Sequelize from 'sequelize';
import { createAndAddTask, Matrix } from './eisenhower/model/matrix.model';

const sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

const matrix = sequelize.define('Matrix', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
});

const task = sequelize.define('Task', {
    kind: {
        type: Sequelize.STRING(20),
    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(100),
    },
    done: {
        type: Sequelize.BOOLEAN,
    },
});

matrix.hasMany(task, {onDelete: 'cascade', hooks: true});
task.belongsTo(matrix, {});

const matrixExample = Maybe.Just(1)
    .map(Matrix)
    .map(createAndAddTask(__, 'a task'))
    // .map((m) => ({
    //     id: m.id,
    //     tasks: m.tasks.toArray(),
    // }))
    .just();

const run = async (done) => {
    Validation
        .point(await task.drop());
    try {
        await task.drop();
        await matrix.drop();

        await matrix.sync({force: true});
        await task.sync({force: true});

    } catch (error) {
        console.log('Sync error: ' + error);

        sequelize.close();

        return done();
    }

    // console.log(res0);

    await matrix.create(matrixExample);

    matrixExample.tasks.forEach(async (x) => {
        await task.create(x);
    });

    // console.log(res1);

    const res3 = await matrix.findById(1);

    await sequelize.close();

    done();
};

run(() => console.log('end'));
