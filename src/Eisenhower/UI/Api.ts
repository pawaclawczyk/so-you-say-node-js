import { Module } from "@nestjs/common";
import { MatrixApi } from "./Api/MatrixApi";

@Module({
    modules: [
        MatrixApi,
    ],
})
export class Api {}
