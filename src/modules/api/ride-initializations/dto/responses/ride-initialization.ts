import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { RideInitializationEntity } from "../../../../../entities/ride-initialization.js";
import { RideClassesEnum } from "../../../../../shared/enums/ride-classes.enum.js";
import { RideDetailFieldsEnum } from "../../../../../shared/enums/ride-detail-fields.enum.js";
import { RideServicesEnum } from "../../../../../shared/enums/ride-services.enum.js";
import { RidePassengerResponseDto } from "../../../shared/dto/responses/ride-passenger.js";

export class RideInitializationResponseDto {
  @ApiProperty({ format: "uuid" })
  id: string;

  @ApiProperty({ format: "date-time" })
  createdAt: Date;

  @ApiPropertyOptional({ type: RidePassengerResponseDto })
  passenger?: RidePassengerResponseDto;

  @ApiPropertyOptional({ isArray: true })
  route?: string[];

  @ApiPropertyOptional({ enum: RideClassesEnum, enumName: "RideClassesEnum" })
  class?: RideClassesEnum;

  @ApiPropertyOptional({ enum: RideServicesEnum, enumName: "RideServicesEnum", isArray: true })
  services?: RideServicesEnum[];

  constructor(initialization: RideInitializationEntity) {
    this.id = initialization.id;
    this.createdAt = initialization.createdAt;

    for (const detail of initialization.details) {
      if (detail.isForField(RideDetailFieldsEnum.PASSENGER)) {
        this.passenger = new RidePassengerResponseDto(detail.value);
      } else if (detail.isForField(RideDetailFieldsEnum.ROUTE)) {
        this.route = detail.value.slice();
      } else if (detail.isForField(RideDetailFieldsEnum.CLASS)) {
        this.class = detail.value;
      } else if (detail.isForField(RideDetailFieldsEnum.SERVICES)) {
        this.services = detail.value.slice();
      }
    }
  }
}
