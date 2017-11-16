import { Module } from "@nestjs/common";
import { AddTask, ClearMatrix, SingleMatrixInMemoryRepository } from "../../predef";
import {AddTaskAction} from "./Controller/Matrix/AddTaskAction";
import {ClearTasksAction} from "./Controller/Matrix/ClearTasksAction";
import {GetTaskAction} from "./Controller/Matrix/GetTaskAction";

@Module({
    components: [
        AddTask,
        ClearMatrix,
        {
            provide: "MatrixRepository",
            useClass: SingleMatrixInMemoryRepository,
        },
    ],
    controllers: [
        GetTaskAction,
        AddTaskAction,
        ClearTasksAction,
    ],
})

export class MatrixApi {}
