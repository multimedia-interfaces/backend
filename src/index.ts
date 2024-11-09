import "reflect-metadata";

import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import appConfig from "./configs/app.config.js";
import { AppModule } from "./modules/app.module.js";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const app = await NestFactory.create<NestExpressApplication>(AppModule, { bodyParser: true, cors: true }),
  config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

app.enableShutdownHooks();

app.set("trust proxy", true);

app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    forbidNonWhitelisted: true,
  }),
);

SwaggerModule.setup("docs", app, () =>
  SwaggerModule.createDocument(app, new DocumentBuilder().setTitle("API").addBearerAuth().build()),
);

function setupGracefulShutdownOn(reason: "uncaughtException" | "unhandledRejection"): void {
  process.on(reason, (error) => {
    const logger = new Logger(reason);

    logger.error(error);

    logger.debug("closing app");
    app
      .close()
      .then(() => {
        logger.log("closed app");
      })
      .catch((error: unknown) => {
        logger.error("error closing app", error);
      })
      .finally(() => {
        logger.log("exiting");
        process.exit(1);
      });
  });
}

setupGracefulShutdownOn("uncaughtException");
setupGracefulShutdownOn("unhandledRejection");

await app.listen(config.port);
