import { QueryFailedError } from "typeorm";
import { DatabaseError } from "pg-protocol";

export default function isQueryFailedError(value: unknown): value is QueryFailedError & DatabaseError {
  return value instanceof QueryFailedError;
}
