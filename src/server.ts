import { NestFactory } from "@nestjs/core";
import * as bodyParser from "body-parser";
import * as express from "express";
import { ApplicationModule } from "./Modules/app.module";

const bootstrap = async () => {
    const instance = express();
    instance.use(bodyParser.json());
    const app = await NestFactory.create(ApplicationModule, instance);
    app.listen(Number(process.env.PORT) || 3000);
};

bootstrap();
