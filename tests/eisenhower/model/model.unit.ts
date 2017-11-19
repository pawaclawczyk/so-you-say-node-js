import { Maybe } from "monet";
import * as R from "ramda";
import { AddTask, CreateMatrix, FinishTask, Matrix, TaskName } from "../../../src/eisenhower/model/model";

describe("An Eisenhower matrix", () => {
    it("does empty lists after creation", () => {
        const matrix = CreateMatrix();

        expect(matrix.doFirst.size).toBe(0);
        expect(matrix.schedule.size).toBe(0);
        expect(matrix.delegate.size).toBe(0);
        expect(matrix.doNotDo.size).toBe(0);
    });

    it("adds tasks to the do first list in the matrix", () => {
        const matrix: Matrix = Maybe
            .pure(CreateMatrix())
            .map(R.curry(AddTask)(R.__, "My first task"))
            .map(R.curry(AddTask)(R.__, "My second task"))
            .just()
        ;

        expect(matrix.doFirst.size).toBe(2);
        expect(matrix.schedule.size).toBe(0);
        expect(matrix.delegate.size).toBe(0);
        expect(matrix.doNotDo.size).toBe(0);
    });

    it("creates tasks with ids related to the current number of tasks in matrix", () => {
        const addTask = R.curry(AddTask);

        const matrix: Matrix = Maybe
            .pure(CreateMatrix())
            .map(addTask(R.__, "My first task"))
            .map(addTask(R.__, "My second task"))
            .just()
        ;

        expect(matrix.doFirst.get(0).id).toBe(1);
        expect(matrix.doFirst.get(0).name).toBe("My first task");
        expect(matrix.doFirst.get(1).id).toBe(2);
        expect(matrix.doFirst.get(1).name).toBe("My second task");
    });

    it("marks task as done", () => {
        const addTask = R.curry(AddTask);

        const matrix: Matrix = Maybe
            .pure(CreateMatrix())
            .map(addTask(R.__, "My first task"))
            .just()
        ;

        const matrixWithFinishedTask = FinishTask(matrix, 1);

        expect(matrixWithFinishedTask.doFirst.get(0).done).toBe(true);
    });
});
