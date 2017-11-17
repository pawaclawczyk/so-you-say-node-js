import { MatrixId } from "./MatrixId";
import { Task } from "./Task";

export class Matrix {
    constructor(
        readonly id: MatrixId,
        readonly doFirst: Task[],
        readonly schedule: Task[],
        readonly delegate: Task[],
        readonly doNotDo: Task[],
    ) {}

    public isEmpty(): boolean {
        return this.doFirst.length === 0
            && this.schedule.length === 0
            && this.delegate.length === 0
            && this.doNotDo.length === 0;
    }

    public totalCount(): number {
        return this.doFirst.length
            + this.schedule.length
            + this.delegate.length
            + this.doNotDo.length;
    }

    public add(t: Task): Matrix {
        if (t.isImportant && t.isUrgent) {
            return new Matrix(this.id, this.doFirst.concat(t), this.schedule, this.delegate, this.doNotDo);
        } else if (t.isImportant && !t.isUrgent) {
            return new Matrix(this.id, this.doFirst, this.schedule.concat(t), this.delegate, this.doNotDo);
        } else if (!t.isImportant && t.isUrgent) {
            return new Matrix(this.id, this.doFirst, this.schedule, this.delegate.concat(t), this.doNotDo);
        } else if (!t.isImportant && !t.isUrgent) {
            return new Matrix(this.id, this.doFirst, this.schedule, this.delegate, this.doNotDo.concat(t));
        } else {
            return this;
        }
    }

    public clear(): Matrix {
        return Empty(this.id);
    }
}

export const Empty = (id: MatrixId) => new Matrix(id, [], [], [], []);
