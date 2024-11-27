import { Type } from "@nestjs/common";
import { BaseEntity } from "typeorm";
import { RideDetailEntity } from "./ride-details.js";
import { RideInitializationEntity } from "./ride-initialization.js";
import { RideEntity } from "./ride.js";
import { UserEntity } from "./user.js";

const entities = [UserEntity, RideDetailEntity, RideInitializationEntity, RideEntity] satisfies Type<BaseEntity>[];

export default entities;

export {
  RideEntity as Ride,
  RideDetailEntity as RideDetails,
  RideInitializationEntity as RideInitialization,
  UserEntity,
};
