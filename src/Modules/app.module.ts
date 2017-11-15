import { Module } from "@nestjs/common";
import { MatrixController } from "../Controllers/MatrixController";
import { AddTask, ClearMatrix, SingleMatrixInMemoryRepository } from "../Eisenhower/predef";

@Module({
    components: [
        AddTask,
        ClearMatrix,
        {
            provide: "MatrixRepository",
            useClass: SingleMatrixInMemoryRepository,
        },
    ],
    controllers: [ MatrixController ],
})

export class ApplicationModule {}
