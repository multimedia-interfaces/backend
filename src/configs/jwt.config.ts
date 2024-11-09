import { registerAs } from "@nestjs/config";
import { ConfigEnum } from "../shared/enums/config.enum.js";

export default registerAs(ConfigEnum.JWT, () => {
  if (typeof process.env.JWT_SECRET !== "string") {
    throw new Error("JWT_SECRET env variable is not provided");
  }

  if (typeof process.env.JWT_EXRIRES_IN_SEC !== "string") {
    throw new Error("JWT_EXRIRES_IN_SEC env variable is not provided");
  }

  const expiresInSec = Number(process.env.JWT_EXRIRES_IN_SEC);

  if (isNaN(expiresInSec)) {
    throw new Error("DB_PORT env variable is not provided");
  }

  return {
    secret: process.env.JWT_SECRET,
    expiresInSec,
  };
});
