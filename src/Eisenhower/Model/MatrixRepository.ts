import { Matrix } from "./Matrix";
import { MatrixId } from "./MatrixId";

interface MatrixRepository {
    get(id: MatrixId): Matrix;
    store(matrix: Matrix): void;
}

export { MatrixRepository };
