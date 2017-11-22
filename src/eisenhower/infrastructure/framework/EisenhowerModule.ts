import { Module } from '@nestjs/common';
import { Map } from 'immutable';
import { InMemoryGet, InMemoryStore } from '../../../common/infrastructure/repository/InMemoryRepository';
import { RepositoryGet, RepositoryStore } from '../../../common/model/repository/repository';
import { AddTask, ClearTasks, CreateMatrix } from '../../application/use_case';
import { GetMatrixView } from '../../application/view';
import { Matrix, MatrixId } from '../../model/matrix.model';
import { AddTaskAction } from './controller/AddTaskAction';
import { ClearTasksAction } from './controller/ClearTasksAction';
import { GetMatrixAction } from './controller/GetMatrixAction';
import services from './services';

const matrices = Map<MatrixId, Matrix>().asMutable();

const repositoryGet: RepositoryGet<MatrixId, Matrix> = InMemoryGet(matrices);
const repositoryStore: RepositoryStore<MatrixId, Matrix> = InMemoryStore(matrices);

@Module({
    components: [
        {
            provide: services.GET_MATRIX,
            useValue: GetMatrixView(repositoryGet),
        },
        {
            provide: services.ADD_TASK,
            useValue: AddTask(repositoryGet, repositoryStore),
        },
        {
            provide: services.CLEAR_TASKS,
            useValue: ClearTasks(repositoryGet, repositoryStore),
        },
        {
            provide: services.CREATE_MATRIX,
            useValue: CreateMatrix(repositoryStore),
        }
    ],
    controllers: [
        GetMatrixAction,
        AddTaskAction,
        ClearTasksAction,
    ],
})
export class EisenhowerModule {}
