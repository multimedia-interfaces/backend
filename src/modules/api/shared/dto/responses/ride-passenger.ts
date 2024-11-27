import { ApiProperty } from "@nestjs/swagger";
import { RidePassengerInfo } from "../../../../../shared/types/ride-passenger-info.type.js";

export class RidePassengerResponseDto implements RidePassengerInfo {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  phone!: string;

  constructor(info: RidePassengerInfo) {
    this.name = info.name;
    this.phone = info.phone;
  }
}
