import * as request from "supertest";
import { Response } from "supertest";
import { app } from "../src/server";
import { Task } from "../src/Eisenhower/Model/Task";
import { Empty, Matrix } from "../src/Eisenhower/Model/Matrix";

describe("Eisenhower Matrix API", () => {
    const server = request(app);

    it("shows the matrix", async () => {
        const response: Response = await server
            .get("/matrix");

        expect(response.status).toBe(200);

        expect(response.body).toEqual(Empty());
    });

    it("adds task to the matrix", async () => {
        const task = new Task("My first task", true, true);

        const response = await server
            .post("/matrix")
            .send(task);

        expect(response.status).toBe(201);

        const matrixResponse = await server
            .get("/matrix");

        expect(matrixResponse.body).toEqual(new Matrix([task], [], [], []));
    });

    it("clears the matrix", async () => {
        const response = await server
            .delete("/matrix");

        expect(response.status).toBe(204);

        const matrixResponse = await server
            .get("/matrix");

        expect(matrixResponse.body).toEqual(Empty());
    });
});
