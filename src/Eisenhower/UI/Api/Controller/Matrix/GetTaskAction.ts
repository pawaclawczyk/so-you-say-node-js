import { Controller, Get, HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/core";
import { Matrix, MatrixId, MatrixRepository } from "../../../../predef";

@Controller("matrix")
export class GetTaskAction {
    constructor(private readonly matrices: MatrixRepository) {}

    @Get()
    public handle(): Matrix {
        return this
            .matrices
            .get(1 as MatrixId)
            .do({
                nothing: () => { throw new HttpException("Not Found", HttpStatus.NOT_FOUND); },
            })
            .valueOrThrow();
    }
}
