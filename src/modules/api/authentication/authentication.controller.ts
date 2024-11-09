import { Body, Post } from "@nestjs/common";
import { ApiConflictResponse, ApiCreatedResponse } from "@nestjs/swagger";
import { APIController } from "../shared/decorators/api-controller.decorator.js";
import { AuthenticationService } from "./authentication.service.js";
import { LoginBodyDTO } from "./dtos/requests/login.body.js";
import { RegistrationBodyDTO } from "./dtos/requests/registration.body.js";
import { AuthorizeResponseDTO } from "./dtos/responses/authorize.js";

@APIController("Authentication")
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @Post("/registration")
  @ApiConflictResponse({ description: "Phone number is already in use" })
  @ApiCreatedResponse({ type: AuthorizeResponseDTO })
  async register(@Body() body: RegistrationBodyDTO): Promise<AuthorizeResponseDTO> {
    return await this.service.register(body);
  }

  @Post("/login")
  @ApiCreatedResponse({ type: AuthorizeResponseDTO })
  async login(@Body() body: LoginBodyDTO): Promise<AuthorizeResponseDTO> {
    return await this.service.login(body);
  }
}
