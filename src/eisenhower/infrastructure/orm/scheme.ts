import { EntitySchema } from 'typeorm';

const MatrixScheme: EntitySchema = {
    name: 'Matrix',
    columns: {
        id: {
            primary: true,
            type: 'integer',
        },
    },
    relations: {
        tasks: {
            target: 'Task',
            type: 'many-to-many',
            joinTable: true,
            cascadeAll: true,
        },
    },
};

const TaskScheme: EntitySchema = {
    name: 'Task',
    columns: {
        id: {
            primary: true,
            type: 'integer',
        },
        kind: {
            type: 'varchar',
            length: 20,
        },
        name: {
            type: 'varchar',
            length: 100,
        },
        done: {
            type: 'tinyint',
            length: 1,
        },
    },
};

export const schemas = [MatrixScheme, TaskScheme];
export const root = 'Matrix';
