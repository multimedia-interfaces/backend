import { ApiProperty } from "@nestjs/swagger";
import { RideEntity } from "../../../../../entities/ride.js";
import { PaginatedResponseDto } from "../../../shared/dto/responses/paginated.js";
import { RideResponseDto } from "./ride.js";

export class RidesResponseDto extends PaginatedResponseDto<RideResponseDto> {
  @ApiProperty({ type: [RideResponseDto] })
  data: RideResponseDto[];

  constructor(rides: RideEntity[], total: number) {
    super(total);

    this.data = rides.map((ride) => new RideResponseDto(ride));
  }
}
