import { Get, Req } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";
import { APIAuthenticatedController } from "../shared/decorators/api-authenticated-controller.decorator.js";
import { AuthorizedRequest } from "../shared/types/authorized-request.type.js";
import { ProfileResponseDTO } from "./dtos/responses/profile.js";
import { ProfileService } from "./profile.service.js";

@APIAuthenticatedController("Profile")
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get("/")
  @ApiOkResponse({ type: ProfileResponseDTO })
  @ApiNotFoundResponse({ description: "User not found" })
  async getOwnProfile(@Req() req: AuthorizedRequest): Promise<ProfileResponseDTO> {
    return await this.service.get(req.token.sub);
  }
}
