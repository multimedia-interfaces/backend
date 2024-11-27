import { ApiProperty } from "@nestjs/swagger";
import { RideEntity } from "../../../../../entities/ride.js";
import { RideClassesEnum } from "../../../../../shared/enums/ride-classes.enum.js";
import { RideServicesEnum } from "../../../../../shared/enums/ride-services.enum.js";
import { RidePassengerResponseDto } from "../../../shared/dto/responses/ride-passenger.js";

export class RideResponseDto {
  @ApiProperty({ format: "uuid" })
  id: string;

  @ApiProperty({ type: RidePassengerResponseDto })
  passenger: RidePassengerResponseDto;

  @ApiProperty({ isArray: true })
  route: string[];

  @ApiProperty({ enum: RideClassesEnum, enumName: "RideClassesEnum" })
  class: RideClassesEnum;

  @ApiProperty({ enum: RideServicesEnum, enumName: "RideServicesEnum", isArray: true })
  services: RideServicesEnum[];

  @ApiProperty({ type: "string", format: "date-time" })
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  finalizedAt: Date;

  constructor(ride: RideEntity) {
    this.id = ride.id;
    this.passenger = new RidePassengerResponseDto(ride.passenger);
    this.route = ride.route.slice();
    this.class = ride.class;
    this.services = ride.services.slice();
    this.createdAt = ride.createdAt;
    this.finalizedAt = ride.finalizedAt;
  }
}
