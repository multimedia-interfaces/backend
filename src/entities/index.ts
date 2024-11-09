import { BaseEntity } from "typeorm";
import { UserEntity } from "./user.js";

const entities = [UserEntity] satisfies (new () => BaseEntity)[];

export default entities;

export { UserEntity } from "./user.js";
