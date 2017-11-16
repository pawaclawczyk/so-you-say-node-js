import { Controller, Dependencies, Get, HttpStatus, Res } from "@nestjs/common";
import { MatrixId, MatrixRepository } from "../../../../predef";

@Controller("matrix")
@Dependencies("MatrixRepository")
export class GetTaskAction {
    constructor(
        private matrices: MatrixRepository,
    ) {}

    @Get()
    public handle(@Res() response) {
        const matrix = this.matrices.get(1 as MatrixId);

        response
            .status(HttpStatus.OK)
            .json(matrix);
    }
}
