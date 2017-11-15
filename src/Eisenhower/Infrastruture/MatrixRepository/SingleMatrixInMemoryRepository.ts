import { Empty, Matrix } from "../../Model/Matrix";
import { MatrixId } from "../../Model/MatrixId";
import { MatrixRepository } from "../../Model/MatrixRepository";

class SingleMatrixInMemoryRepository implements MatrixRepository {
    private matrix: Matrix;

    constructor() {
        this.matrix = Empty();
    }

    public get(id: MatrixId): Matrix {
        return this.matrix;
    }

    public store(matrix: Matrix): void {
        this.matrix = matrix;
    }
}

export { SingleMatrixInMemoryRepository };
