import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { ApplicationModule } from './ApplicationModule';

const bootstrap = async () => {
    const app = await NestFactory.create(ApplicationModule);

    app.use(bodyParser.json());

    app.listen(Number(process.env.PORT) || 3000);
};

bootstrap();
