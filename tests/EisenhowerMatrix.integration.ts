import { Test } from "@nestjs/testing";
import * as bodyParser from "body-parser";
import * as express from "express";
import * as request from "supertest";
import { Response } from "supertest";
import { Empty, Matrix } from "../src/Eisenhower/Model/Matrix";
import { Task } from "../src/Eisenhower/Model/Task";
import { ApplicationModule } from "../src/Modules/app.module";

describe("Eisenhower Matrix API", () => {
    const server = express();

    server.use(bodyParser.json());

    beforeAll(async () => {
        const module = await Test.createTestingModule({
                modules: [ApplicationModule],
            })
            .compile();

        const app = module.createNestApplication(server);
        await app.init();
    });

    it("shows the matrix", async () => {
        const response: Response = await request(server)
            .get("/matrix");

        expect(response.status).toBe(200);

        expect(response.body).toEqual(Empty());
    });

    it("adds task to the matrix", async () => {
        const task = new Task("My first task", true, true);

        const response = await request(server)
            .post("/matrix")
            .send(task);

        expect(response.status).toBe(201);

        const matrixResponse = await request(server)
            .get("/matrix");

        expect(matrixResponse.body).toEqual(new Matrix([task], [], [], []));
    });

    it("clears the matrix", async () => {
        const response = await request(server)
            .delete("/matrix");

        expect(response.status).toBe(204);

        const matrixResponse = await request(server)
            .get("/matrix");

        expect(matrixResponse.body).toEqual(Empty());
    });
});
