import { registerAs } from "@nestjs/config";
import { ConfigEnum } from "../shared/enums/config.enum.js";

export default registerAs(ConfigEnum.DB, () => {
  if (typeof process.env.DB_HOST !== "string") {
    throw new Error("DB_HOST env variable is not provided");
  }

  if (typeof process.env.DB_PORT !== "string") {
    throw new Error("DB_PORT env variable is not provided");
  }

  if (typeof process.env.DB_USER !== "string") {
    throw new Error("DB_USER env variable is not provided");
  }

  if (typeof process.env.DB_PASSWORD !== "string") {
    throw new Error("DB_PASSWORD env variable is not provided");
  }

  if (typeof process.env.DB_NAME !== "string") {
    throw new Error("DB_NAME env variable is not provided");
  }

  return {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
});
