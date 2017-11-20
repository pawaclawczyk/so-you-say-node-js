import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as request from 'supertest';
import { Response } from 'supertest';
import { Repository, storeInRepository } from '../src/common/model/repository/repository';
import { EisenhowerModule } from '../src/eisenhower/infrastructure/framework/EisenhowerModule';
import services from '../src/eisenhower/infrastructure/framework/services';
import { Matrix, MatrixId } from '../src/eisenhower/model/matrix.model';
import { TaskKinds } from '../src/eisenhower/model/task.model';

describe('eisenhower Matrix API', () => {
    const MATRIX_ID = 1;

    const server = express();

    server.use(bodyParser.json());

    beforeAll(async () => {
        const module: TestingModule = await Test
            .createTestingModule({ modules: [EisenhowerModule] })
            .compile();

        const repository: Repository<MatrixId, Matrix> =
            module.select(EisenhowerModule).get(services.MATRIX_REPOSITORY);

        storeInRepository(repository)(Matrix(MATRIX_ID));

        const app = module.createNestApplication(server);
        await app.init();
    });

    it('shows the matrix', async () => {
        const response: Response = await request(server)
            .get(`/matrix/${ MATRIX_ID }`);

        expect(response.status).toBe(HttpStatus.OK);

        expect(response.body).toBeDefined();
        expect(response.body.id).toEqual(MATRIX_ID);
        expect(response.body.tasks).toEqual([]);
    });

    it('adds task', async () => {
        const input = {
            name: 'my first task',
        };

        const output = [{
            kind: TaskKinds.WaitingTask,
            id: 1,
            name: 'my first task',
        }];

        const created: Response = await request(server)
            .post(`/matrix/${MATRIX_ID}/tasks`)
            .send(input);

        expect(created.status).toBe(201);

        const response: Response = await request(server)
            .get(`/matrix/${ MATRIX_ID }`);

        expect(response.status).toBe(HttpStatus.OK);

        expect(response.body).toBeDefined();
        expect(response.body.id).toEqual(MATRIX_ID);
        expect(response.body.tasks).toEqual(output);
    });

    it('clears all tasks', async () => {
        const input = {
            name: 'my first task',
        };

        const created: Response = await request(server)
            .post(`/matrix/${MATRIX_ID}/tasks`)
            .send(input);

        const cleared: Response = await request(server)
            .delete(`/matrix/${ MATRIX_ID }/tasks`);

        expect(cleared.status).toBe(HttpStatus.NO_CONTENT);

        const response: Response = await request(server)
            .get(`/matrix/${ MATRIX_ID }`);

        expect(response.status).toBe(HttpStatus.OK);

        expect(response.body).toBeDefined();
        expect(response.body.id).toEqual(MATRIX_ID);
        expect(response.body.tasks).toEqual([]);
    });
});
