import { NestFactory } from "@nestjs/core";
import * as bodyParser from "body-parser";
import { Api } from "./Eisenhower/UI/Api";

const bootstrap = async () => {
    const app = await NestFactory.create(Api);

    app.use(bodyParser.json());

    app.listen(Number(process.env.PORT) || 3000);
};

bootstrap();
