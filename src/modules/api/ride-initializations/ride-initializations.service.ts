import { Injectable, NotFoundException } from "@nestjs/common";
import { RideInitializationResponseDto } from "./dto/responses/ride-initialization.js";
import { RideInitializationEntity } from "../../../entities/ride-initialization.js";
import { UpdateRideInitializationBodyDto } from "./dto/requests/update-ride-initialization.js";
import { RideDetailEntity } from "../../../entities/ride-details.js";

@Injectable()
export class RideInitializationsService {
  async create(userID: string): Promise<RideInitializationResponseDto> {
    const initialization = await RideInitializationEntity.save({ userID, details: [] });

    return new RideInitializationResponseDto(initialization);
  }

  async update(
    userID: string,
    id: string,
    update: UpdateRideInitializationBodyDto["update"],
  ): Promise<RideInitializationResponseDto> {
    const initialization = await RideInitializationEntity.findOne({ where: { id, userID } });

    if (initialization === null) {
      throw new NotFoundException("Ride initialization not found");
    }

    let detail = initialization.details.find((detail) => detail.isForField(update.field));
    if (detail === undefined) {
      detail = new RideDetailEntity();
      detail.initializationID = initialization.id;
      detail.field = update.field;

      initialization.details.push(detail);
    }

    detail.value = update.value;
    await detail.save();

    return new RideInitializationResponseDto(initialization);
  }
}
