import * as Sequelize from 'sequelize';
import { Maybe } from "monet";
import { createAndAddTask, Matrix } from "./eisenhower/model/matrix.model";
import { __ } from "ramda";

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

matrix.hasMany(task);

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch((err) => {
//         console.error('Unable to connect to the database:', err);
//     });

const m = Maybe.Just(1)
    .map(Matrix)
    .map(createAndAddTask(__, 'a task'))
    .just();

const res0 = matrix.sync({force: true}).then(() => {
    return matrix.create(m);
});

console.log(res0);
