import { Controller, Get, HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/core";
import { Matrix, MatrixId, MatrixRepository } from "../../../../predef";

@Controller("matrix")
export class GetTaskAction {
    constructor(private readonly matrices: MatrixRepository) {}

    @Get()
    public handle(): Matrix {
        const matrix = this.matrices.get(1 as MatrixId);

        matrix.orElseRun(() => {
            throw new HttpException("Matrix not found", HttpStatus.NOT_FOUND);
        });

        return matrix.just();
    }
}
