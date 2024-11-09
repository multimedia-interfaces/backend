import { applyDecorators, Controller } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";

export const APIController = (tag: string) =>
  applyDecorators(ApiTags(tag), ApiBadRequestResponse(), ApiInternalServerErrorResponse(), Controller("/"));
