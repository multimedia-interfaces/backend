import { applyDecorators } from "@nestjs/common";
import { APIController } from "./api-controller.decorator.js";
import { UseBearerAuthentication } from "./use-bearer-authentication.decorator.js";
import { ApiUnauthorizedResponse } from "@nestjs/swagger";

export const APIAuthenticatedController = (tag: string) =>
  applyDecorators(APIController(tag), UseBearerAuthentication(), ApiUnauthorizedResponse());
