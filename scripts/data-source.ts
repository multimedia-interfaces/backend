import { Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DataSource } from "typeorm";
import dbConfig from "../src/configs/db.config.js";
import dataSourceFactory from "../src/utils/data-source-factory.js";
import getDataSourceOptions from "../src/utils/get-data-source-options.js";

async function buildDatabaseConfig(): Promise<DataSource> {
  @Module({
    imports: [ConfigModule.forFeature(dbConfig)],
  })
  class AppModule {}

  const app = await NestFactory.createApplicationContext(AppModule);

  const config = app.get<ConfigType<typeof dbConfig>>(dbConfig.KEY);

  await app.close();

  return await dataSourceFactory(getDataSourceOptions(config, false));
}

export default buildDatabaseConfig();
