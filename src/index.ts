import "reflect-metadata";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module.js";

const app = await NestFactory.create(AppModule, { bodyParser: true, cors: true });

await app.listen(8080);
