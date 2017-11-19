import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing/testing-module";
import * as bodyParser from "body-parser";
import * as express from "express";
import * as request from "supertest";
import { Response } from "supertest";
import { Repository } from "../src/common/model/repository/repository";
import { EisenhowerModule } from "../src/eisenhower/infrastructure/framework/EisenhowerModule";
import services from "../src/eisenhower/infrastructure/framework/services";
import { EmptyMatrix, Matrix } from "../src/eisenhower/model/Matrix";
import { MatrixId } from "../src/eisenhower/model/MatrixId";
import { Task } from "../src/eisenhower/model/Task";

describe("eisenhower Matrix API", () => {
    const MATRIX_ID = 1;

    const server = express();

    server.use(bodyParser.json());

    beforeAll(async () => {
        const module: TestingModule = await Test
            .createTestingModule({ modules: [EisenhowerModule] })
            .compile();

        const repository: Repository<MatrixId, Matrix> =
            module.select(EisenhowerModule).get(services.MATRIX_REPOSITORY);

        repository.store(EmptyMatrix(MATRIX_ID));

        const app = module.createNestApplication(server);
        await app.init();
    });

    it("shows the matrix", async () => {
        const response: Response = await request(server)
            .get("/matrix/1");

        expect(response.status).toBe(200);

        expect(response.body)
            .toEqual({
                id: 1,
                doFirst: [],
                schedule: [],
                delegate: [],
                doNotDo: [],
            });
    });

    it("adds task to the matrix", async () => {
        const task = new Task("My first task", true, true);

        const response = await request(server)
            .post("/matrix/1/tasks")
            .send(task);

        expect(response.status).toBe(201);

        const matrixResponse = await request(server)
            .get("/matrix/1");

        expect(matrixResponse.body)
            .toEqual({
                id: 1,
                doFirst: [task],
                schedule: [],
                delegate: [],
                doNotDo: [],
            });
    });

    it("clears the matrix", async () => {
        const response = await request(server)
            .delete("/matrix/1/tasks");

        expect(response.status).toBe(204);

        const matrixResponse = await request(server)
            .get("/matrix/1");

        expect(matrixResponse.body)
            .toEqual({
                id: 1,
                doFirst: [],
                schedule: [],
                delegate: [],
                doNotDo: [],
            });
    });
});
