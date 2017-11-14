import { Task } from "../../../src/Eisenhower/Model/Task";

describe('An important but not urgent task', () => {
    const t = new Task("Learn how to write good tests", true, false);

    it('has name', () => {
        expect(t.title).toBe("Learn how to write good tests");
    });

    it('is important', () => {
        expect(t.isImportant).toBe(true);
    });

    it('is not urgent', () => {
        expect(t.isUrgent).toBe(false);
    });
});
