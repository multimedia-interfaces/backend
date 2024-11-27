import { Injectable, NotFoundException, PreconditionFailedException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { RideInitializationEntity } from "../../../entities/ride-initialization.js";
import { RideEntity } from "../../../entities/ride.js";
import { RideDetailFieldsEnum } from "../../../shared/enums/ride-detail-fields.enum.js";
import { PaginationRequestDto } from "../shared/dto/requests/pagination.js";
import { RideResponseDto } from "./dto/responses/ride.js";
import { RidesResponseDto } from "./dto/responses/rides.js";

@Injectable()
export class RidesService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async create(userID: string, id: string): Promise<RideResponseDto> {
    return await this.dataSource.transaction(async (entityManager) => {
      const initialization = await entityManager.findOne(RideInitializationEntity, { where: { id, userID } });

      if (initialization === null) {
        throw new NotFoundException("Ride initialization not found");
      }

      const notAppliedDetails = new Set(Object.values(RideDetailFieldsEnum));

      const ride = new RideEntity();
      ride.userID = initialization.userID;
      ride.createdAt = initialization.createdAt;

      for (const detail of initialization.details) {
        if (detail.isForField(RideDetailFieldsEnum.PASSENGER)) {
          ride.passenger = { ...detail.value };
        } else if (detail.isForField(RideDetailFieldsEnum.ROUTE)) {
          ride.route = detail.value.slice();
        } else if (detail.isForField(RideDetailFieldsEnum.CLASS)) {
          ride.class = detail.value;
        } else if (detail.isForField(RideDetailFieldsEnum.SERVICES)) {
          ride.services = detail.value.slice();
        }

        notAppliedDetails.delete(detail.field);
      }

      if (notAppliedDetails.size !== 0) {
        throw new PreconditionFailedException("Not all details are provided");
      }

      await Promise.all([entityManager.save(ride), entityManager.remove(initialization)]);

      return new RideResponseDto(ride);
    });
  }

  async list(userID: string, { page, limit }: PaginationRequestDto): Promise<RidesResponseDto> {
    const [rides, total] = await RideEntity.findAndCount({
      where: { userID },
      skip: page * limit,
      take: limit,
      order: { finalizedAt: "desc" },
    });

    return new RidesResponseDto(rides, total);
  }

  async get(userID: string, id: string): Promise<RideResponseDto> {
    const ride = await RideEntity.findOne({
      where: { id, userID },
    });

    if (ride === null) {
      throw new NotFoundException("Ride not found");
    }

    return new RideResponseDto(ride);
  }
}
