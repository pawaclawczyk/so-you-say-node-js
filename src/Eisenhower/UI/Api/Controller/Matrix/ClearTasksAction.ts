import { Controller, Delete, Dependencies, HttpStatus, Res } from "@nestjs/common";
import { ClearMatrix } from "../../../../Application/ClearMatrix";
import { MatrixId } from "../../../../Model/MatrixId";

@Controller("matrix")
@Dependencies(ClearMatrix)
export class ClearTasksAction {
    constructor(
        private clearer: ClearMatrix,
    ) {}

    @Delete()
    public handle(@Res() response) {
        this.clearer.handle(1 as MatrixId);

        response
            .status(HttpStatus.NO_CONTENT)
            .json();
    }
}
