import { Controller, Get } from "@nestjs/common";
import { Matrix, MatrixId, MatrixRepository } from "../../../../predef";

@Controller("matrix")
export class GetTaskAction {
    constructor(private readonly matrices: MatrixRepository) {}

    @Get()
    public handle(): Matrix {
        return this.matrices.get(1 as MatrixId);
    }
}
