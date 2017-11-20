import { Module } from '@nestjs/common';
import { EisenhowerModule } from './eisenhower/infrastructure/framework/EisenhowerModule';

@Module({
    modules: [
        EisenhowerModule,
    ],
})
export class ApplicationModule {}
