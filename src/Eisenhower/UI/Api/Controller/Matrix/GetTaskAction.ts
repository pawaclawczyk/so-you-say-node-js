import { Controller, Get, HttpStatus, Inject } from "@nestjs/common";
import { HttpException } from "@nestjs/core";
import { Repository } from "../../../../Infrastruture/MatrixRepository/repository";
import { Matrix, MatrixId } from "../../../../predef";

@Controller("matrix")
export class GetTaskAction {
    constructor(@Inject("MyMatrixRepository") private readonly matrices: Repository<MatrixId, Matrix>) {}

    @Get()
    public handle(): Matrix {
        const matrix = this.matrices.get(1 as MatrixId);

        matrix.orElseRun(() => {
            throw new HttpException("Matrix not found", HttpStatus.NOT_FOUND);
        });

        return matrix.just();
    }
}
