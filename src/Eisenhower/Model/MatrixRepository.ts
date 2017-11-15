import { Matrix } from "./Matrix";
import { MatrixId } from "./MatrixId";

export interface MatrixRepository {
    get(id: MatrixId): Matrix;
    store(matrix: Matrix): void;
}
