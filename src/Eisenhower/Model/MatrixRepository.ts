import { Matrix } from "./Matrix";
import { MatrixId } from "./MatrixId";

export abstract class MatrixRepository {
    public abstract get(id: MatrixId): Matrix;
    public abstract store(matrix: Matrix): void;
}
