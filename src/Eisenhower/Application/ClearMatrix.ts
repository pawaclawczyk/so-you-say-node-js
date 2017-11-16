import { Component, Dependencies } from "@nestjs/common";
import {MatrixId} from "../Model/MatrixId";
import {MatrixRepository} from "../Model/MatrixRepository";

@Component()
export class ClearMatrix {
    constructor(private repository: MatrixRepository) {}

    public handle(id: MatrixId): void {
        this.repository.store(
            this.repository.get(id).clear(),
        );
    }
}
