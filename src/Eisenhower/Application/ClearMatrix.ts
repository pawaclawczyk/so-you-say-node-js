import { Component } from "@nestjs/common";
import { MatrixId } from "../Model/MatrixId";
import { MatrixRepository } from "../Model/MatrixRepository";

@Component()
export class ClearMatrix {
    constructor(private repository: MatrixRepository) {
    }

    public handle(id: MatrixId): void {
        this
            .repository
            .get(id)
            .map((m) => m.clear())
            .map((m) => this.repository.store(m));
    }
}
