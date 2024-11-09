import { registerAs } from "@nestjs/config";
import { ConfigEnum } from "../shared/enums/config.enum.js";
import { RedisOptions } from "ioredis";

export default registerAs(ConfigEnum.REDIS, () => {
  if (typeof process.env.REDIS_HOST !== "string") {
    throw new Error(`REDIS_HOST env variable is not specified`);
  }

  if (typeof process.env.REDIS_PASSWORD !== "string") {
    throw new Error(`REDIS_PASSWORD env variable is not specified`);
  }

  return {
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  } satisfies RedisOptions;
});
