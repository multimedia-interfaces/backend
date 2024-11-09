import { MigrationInterface } from "typeorm";
import { CreateUserTable1731111611709 } from "./1731111611709-CreateUserTable.js";

const migrations: (new () => MigrationInterface)[] = [CreateUserTable1731111611709];

export default migrations;
