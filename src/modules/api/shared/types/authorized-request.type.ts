import type { Request } from "express";
import { JwtPayload } from "./jwt.types.js";

export type AuthorizedRequest = Request & {
  token: JwtPayload;
};
