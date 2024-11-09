import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthenticationGuard } from "../guards/authentication.guard.js";

export const UseBearerAuthentication = () => applyDecorators(ApiBearerAuth(), UseGuards(AuthenticationGuard));
