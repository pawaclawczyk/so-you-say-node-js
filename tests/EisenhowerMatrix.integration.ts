import * as request from "supertest";
import { Response } from "supertest";
import { app } from "../src/server";
import { Task } from "../src/Eisenhower/Model/Task";
import { Empty, Matrix } from "../src/Eisenhower/Model/Matrix";

describe("Eisenhower Matrix API", () => {
    it("returns an Eisenhower Matrix", async () => {
        const response: Response = await request(app)
            .get("/matrix");

        expect(response.status).toBe(200);

        expect(response.body).toEqual(Empty());
    });

    it("adds task to Eisenhower Matrix", async () => {
        const task = new Task("My first task", true, true);

        const response = await request(app)
            .post("/matrix")
            .send(task);

        expect(response.status).toBe(200);

        expect(response.body).toEqual(new Matrix([task], [], [], []));
    });

    it("adds clears Eisenhower Matrix", async () => {
        const response = await request(app)
            .delete("/matrix");

        expect(response.status).toBe(200);

        expect(response.body).toEqual(Empty());
    });
});
