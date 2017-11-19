import { Component, Inject } from "@nestjs/common";
import { Repository } from "../../common/model/repository/repository";
import services from "../infrastructure/framework/services";
import { Matrix } from "../model/Matrix";
import { MatrixId } from "../model/MatrixId";
import { Task } from "../model/Task";

@Component()
export class AddTask {
    constructor(@Inject(services.MATRIX_REPOSITORY) private readonly repository: Repository<MatrixId, Matrix>) {}

    public handle(id: MatrixId, task: Task): void {
        this
            .repository
            .get(id)
            .map((m) => m.add(task))
            .forEach((m) => this.repository.store(m))
        ;
    }
}
