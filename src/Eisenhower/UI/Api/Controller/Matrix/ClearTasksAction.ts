import { Controller, Delete, HttpCode } from "@nestjs/common";
import { ClearMatrix, MatrixId } from "../../../../predef";

@Controller("matrix")
export class ClearTasksAction {
    constructor(private readonly clearer: ClearMatrix) {}

    @Delete()
    @HttpCode(204)
    public handle(): void {
        this.clearer.handle(1 as MatrixId);
    }
}
