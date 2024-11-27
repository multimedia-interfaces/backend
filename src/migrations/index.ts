import { Type } from "@nestjs/common";
import { MigrationInterface } from "typeorm";
import { CreateUserTable1731111611709 } from "./1731111611709-CreateUserTable.js";
import { CreateRideRelatedTables1732574331092 } from "./1732574331092-CreateRideRelatedTables.js";

const migrations: Type<MigrationInterface>[] = [CreateUserTable1731111611709, CreateRideRelatedTables1732574331092];

export default migrations;
