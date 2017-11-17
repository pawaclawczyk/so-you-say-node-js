import { Module } from "@nestjs/common";
import { InMemoryRepository } from "../../Infrastruture/MatrixRepository/repository";
import { MatrixId } from "../../Model/MatrixId";
import { AddTask, ClearMatrix, Matrix, MatrixRepository, SingleMatrixInMemoryRepository } from "../../predef";
import { AddTaskAction } from "./Controller/Matrix/AddTaskAction";
import { ClearTasksAction } from "./Controller/Matrix/ClearTasksAction";
import { GetTaskAction } from "./Controller/Matrix/GetTaskAction";

const MyMatrixRepository = new InMemoryRepository<MatrixId, Matrix>();

@Module({
    components: [
        AddTask,
        ClearMatrix,
        {
            provide: MatrixRepository,
            useClass: SingleMatrixInMemoryRepository,
        },
        {
            provide: "MyMatrixRepository",
            useValue: MyMatrixRepository,
        },
    ],
    controllers: [
        GetTaskAction,
        AddTaskAction,
        ClearTasksAction,
    ],
})
export class MatrixApi {}
