import { Component } from "@nestjs/common";
import { Just, Maybe } from "monet";
import { Empty, Matrix } from "../../Model/Matrix";
import { MatrixId } from "../../Model/MatrixId";
import { MatrixRepository } from "../../Model/MatrixRepository";

@Component()
export class SingleMatrixInMemoryRepository extends MatrixRepository {
    private matrix: Matrix;

    constructor() {
        super();

        this.matrix = Empty(1);
    }

    public get(id: MatrixId): Maybe<Matrix> {
        return Just<Matrix>(this.matrix);
    }

    public store(matrix: Matrix): void {
        this.matrix = matrix;
    }
}
