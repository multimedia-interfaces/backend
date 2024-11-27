import { Get, Param, Post, Query, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiPreconditionFailedResponse } from "@nestjs/swagger";
import { RideInitializationResponseDto } from "../ride-initializations/dto/responses/ride-initialization.js";
import { APIAuthenticatedController } from "../shared/decorators/api-authenticated-controller.decorator.js";
import { PaginationRequestDto } from "../shared/dto/requests/pagination.js";
import { AuthorizedRequest } from "../shared/types/authorized-request.type.js";
import { RideResponseDto } from "./dto/responses/ride.js";
import { RidesResponseDto } from "./dto/responses/rides.js";
import { RidesService } from "./rides.service.js";

@APIAuthenticatedController("Rides")
export class RidesController {
  constructor(private readonly service: RidesService) {}

  @Post(":id")
  @ApiCreatedResponse({ type: RideResponseDto })
  @ApiNotFoundResponse({ description: "Ride initialization not found" })
  @ApiPreconditionFailedResponse({ description: "Not all details are provided" })
  async create(@Req() req: AuthorizedRequest, @Param("id") id: string): Promise<RideInitializationResponseDto> {
    return await this.service.create(req.token.sub, id);
  }

  @Get()
  @ApiOkResponse({ type: RidesResponseDto })
  async list(@Req() req: AuthorizedRequest, @Query() pagination: PaginationRequestDto): Promise<RidesResponseDto> {
    return await this.service.list(req.token.sub, pagination);
  }

  @Get(":id")
  @ApiOkResponse({ type: RideResponseDto })
  @ApiNotFoundResponse({ description: "Ride not found" })
  async get(@Req() req: AuthorizedRequest, @Param("id") id: string): Promise<RideResponseDto> {
    return await this.service.get(req.token.sub, id);
  }
}
