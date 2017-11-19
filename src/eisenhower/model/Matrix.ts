import { List } from "immutable";
import { MatrixId } from "./MatrixId";
import { Task } from "./Task";

export class Matrix {
    constructor(
        readonly id: MatrixId,
        readonly doFirst: List<Task>,
        readonly schedule: List<Task>,
        readonly delegate: List<Task>,
        readonly doNotDo: List<Task>,
    ) {}

    public isEmpty(): boolean {
        return this.doFirst.isEmpty()
            && this.schedule.isEmpty()
            && this.delegate.isEmpty()
            && this.doNotDo.isEmpty();
    }

    public totalCount(): number {
        return this.doFirst.size
            + this.schedule.size
            + this.delegate.size
            + this.doNotDo.size;
    }

    public add(t: Task): Matrix {
        if (t.isImportant && t.isUrgent) {
            return new Matrix(this.id, this.doFirst.push(t), this.schedule, this.delegate, this.doNotDo);
        } else if (t.isImportant && !t.isUrgent) {
            return new Matrix(this.id, this.doFirst, this.schedule.push(t), this.delegate, this.doNotDo);
        } else if (!t.isImportant && t.isUrgent) {
            return new Matrix(this.id, this.doFirst, this.schedule, this.delegate.push(t), this.doNotDo);
        } else if (!t.isImportant && !t.isUrgent) {
            return new Matrix(this.id, this.doFirst, this.schedule, this.delegate, this.doNotDo.push(t));
        } else {
            return this;
        }
    }

    public clear(): Matrix {
        return EmptyMatrix(this.id);
    }
}

export const EmptyMatrix = (id: MatrixId) => new Matrix(id, List(), List(), List(), List());
