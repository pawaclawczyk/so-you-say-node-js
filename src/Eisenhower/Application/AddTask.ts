import { MatrixId } from "../Model/MatrixId";
import { MatrixRepository } from "../Model/MatrixRepository";
import { Task } from "../Model/Task";

class AddTask {
    constructor(private repository: MatrixRepository) {}

    public handle(id: MatrixId, task: Task): void {
        this.repository.store(
            this.repository.get(id).add(task),
        );
    }
}

export { AddTask };