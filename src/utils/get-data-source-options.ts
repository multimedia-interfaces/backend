import { ConfigType } from "@nestjs/config";
import { DataSourceOptions } from "typeorm";
import dbConfig from "../configs/db.config.js";
import migrations from "../migrations/index.js";
import entities from "../modules/fundamentals/entities.js";

export default function getDataSourceOptions(
  config: ConfigType<typeof dbConfig>,
  migrationsRun = true,
): DataSourceOptions {
  return {
    type: "postgres",
    ...config,
    entities,
    migrations,
    migrationsRun,
  };
}
