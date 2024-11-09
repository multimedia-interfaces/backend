import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmDataSourceFactory, TypeOrmModule } from "@nestjs/typeorm";
import appConfig from "../configs/app.config.js";
import dbConfig from "../configs/db.config.js";
import dataSourceFactory from "../utils/data-source-factory.js";
import getDataSourceOptions from "../utils/get-data-source-options.js";
import { APIModule } from "./api/api.module.js";
import { ProvidersModule } from "./providers/providers.module.js";

@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(dbConfig)],
      inject: [dbConfig.KEY],
      useFactory: getDataSourceOptions,
      dataSourceFactory: dataSourceFactory as TypeOrmDataSourceFactory,
    }),
    ProvidersModule,
    APIModule,
  ],
})
export class AppModule {}
