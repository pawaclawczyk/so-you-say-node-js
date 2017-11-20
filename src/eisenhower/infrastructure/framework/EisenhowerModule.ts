import { Module } from '@nestjs/common';
import { InMemoryRepository } from '../../../common/infrastructure/repository/InMemoryRepository';
import { Repository } from '../../../common/model/repository/repository';
import { addTask, clearTasks } from '../../application/use_case';
import { getMatrix } from '../../application/view';
import { Matrix, MatrixId } from '../../model/matrix.model';
import { AddTaskAction } from './controller/AddTaskAction';
import { ClearTasksAction } from './controller/ClearTasksAction';
import { GetMatrixAction } from './controller/GetMatrixAction';
import services from './services';

const InMemoryMatrixRepository: Repository<MatrixId, Matrix> = new InMemoryRepository<MatrixId, Matrix>();

@Module({
    components: [
        {
            provide: services.MATRIX_REPOSITORY,
            useValue: InMemoryMatrixRepository,
        },
        {
            provide: services.GET_MATRIX,
            useValue: getMatrix(InMemoryMatrixRepository),
        },
        {
            provide: services.ADD_TASK,
            useValue: addTask(InMemoryMatrixRepository),
        },
        {
            provide: services.CLEAR_TASKS,
            useValue: clearTasks(InMemoryMatrixRepository),
        },
    ],
    controllers: [
        GetMatrixAction,
        AddTaskAction,
        ClearTasksAction,
    ],
})
export class EisenhowerModule {}
