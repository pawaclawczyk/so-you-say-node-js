import { Module } from '@nestjs/common';
import { InMemoryRepository } from '../../../common/infrastructure/repository/InMemoryRepository';
import { AddTask } from '../../application/AddTask';
import { ClearMatrix } from '../../application/ClearMatrix';
import { Matrix } from '../../model/Matrix';
import { MatrixId } from '../../model/MatrixId';
import { AddTaskAction } from './controller/AddTaskAction';
import { ClearTasksAction } from './controller/ClearTasksAction';
import { GetMatrixAction } from './controller/GetMatrixAction';
import services from './services';

const InMemoryMatrixRepository = new InMemoryRepository<MatrixId, Matrix>();

@Module({
    components: [
        AddTask,
        ClearMatrix,
        {
            provide: services.MATRIX_REPOSITORY,
            useValue: InMemoryMatrixRepository,
        },
    ],
    controllers: [
        GetMatrixAction,
        AddTaskAction,
        ClearTasksAction,
    ],
})
export class EisenhowerModule {}
