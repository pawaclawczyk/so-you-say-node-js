import { Empty } from "../../../src/Eisenhower/Model/Matrix";
import { Task } from "../../../src/Eisenhower/Model/Task";

describe("An Eisenhower matrix", () => {
    const empty = Empty(1);
    const importantAndUrgent = new Task("Important and urgent", true, true);
    const importantButNotUrgent = new Task("Important but not urgent", true, false);
    const notImportantButUrgent = new Task("Not important but urgent", false, true);
    const notImportantAndNotUrgent = new Task("Not important and not urgent", false, false);

    it("is empty", () => {
        expect(empty.isEmpty()).toBe(true);
    });

    it("is not empty after adding a task", () => {
        const notEmpty = empty.add(importantAndUrgent);

        expect(notEmpty.isEmpty()).toBe(false);
    });

    it("has number of all tasks", () => {
        const withTwoTasks = empty.add(importantAndUrgent).add(importantButNotUrgent);

        expect(withTwoTasks.totalCount()).toBe(2);
    });

    it("is immutable when adding new tasks", () => {
        const withOneTask = empty.add(importantAndUrgent);
        const withTwoTasks = withOneTask.add(notImportantButUrgent);

        expect(empty.totalCount()).toBe(0);
        expect(withOneTask.totalCount()).toBe(1);
        expect(withTwoTasks.totalCount()).toBe(2);
    });

    it("enqueues important and urgent tasks as \"do first\"", () => {
        const matrix = empty.add(importantAndUrgent);

        expect(matrix.doFirst.length).toBe(1);
    });

    it("enqueues important but not urgent tasks as \"schedule\"", () => {
        const matrix = empty.add(importantButNotUrgent);

        expect(matrix.schedule.length).toBe(1);
    });

    it("enqueues not important but urgent tasks as \"delegate\"", () => {
        const matrix = empty.add(notImportantButUrgent);

        expect(matrix.delegate.length).toBe(1);
    });

    it("enqueues not important and not urgent tasks as \"do not do\"", () => {
        const matrix = empty.add(notImportantAndNotUrgent);

        expect(matrix.doNotDo.length).toBe(1);
    });
});
