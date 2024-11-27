import { Body, Param, Patch, Post, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";
import { APIAuthenticatedController } from "../shared/decorators/api-authenticated-controller.decorator.js";
import { AuthorizedRequest } from "../shared/types/authorized-request.type.js";
import { UpdateRideInitializationBodyDto } from "./dto/requests/update-ride-initialization.js";
import { RideInitializationResponseDto } from "./dto/responses/ride-initialization.js";
import { RideInitializationsService } from "./ride-initializations.service.js";

@APIAuthenticatedController("Ride initializations")
export class RideInitializationsController {
  constructor(private readonly service: RideInitializationsService) {}

  @Post()
  @ApiCreatedResponse({ type: RideInitializationResponseDto })
  async create(@Req() req: AuthorizedRequest): Promise<RideInitializationResponseDto> {
    return await this.service.create(req.token.sub);
  }

  @Patch(":id")
  @ApiOkResponse({ type: RideInitializationResponseDto })
  @ApiNotFoundResponse()
  async update(
    @Req() req: AuthorizedRequest,
    @Param("id") id: string,
    @Body() body: UpdateRideInitializationBodyDto,
  ): Promise<RideInitializationResponseDto> {
    return await this.service.update(req.token.sub, id, body.update);
  }
}
