import "reflect-metadata";

import { ConfigType } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import appConfig from "./configs/app.config.js";
import { AppModule } from "./modules/app.module.js";

const app = await NestFactory.create(AppModule, { bodyParser: true, cors: true });

const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

await app.listen(config.port);
