import { Map } from "immutable";
import { Maybe } from "monet";
import { Matrix } from "../../Model/Matrix";
import { MatrixId } from "../../Model/MatrixId";
import { MatrixRepository } from "../../Model/MatrixRepository";

export class InMemoryMatrixRepository extends MatrixRepository {
    private matrices: Map<MatrixId, Matrix>;

    constructor() {
        super();

        this.matrices = Map();
    }

    public get(id: MatrixId): Maybe<Matrix> {
        return Maybe.fromNull(this.matrices.get(id));
    }

    public store(matrix: Matrix): void {
        this.matrices = this.matrices.set(matrix.id, matrix);
    }
}
