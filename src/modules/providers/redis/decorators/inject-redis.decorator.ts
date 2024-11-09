import { Inject } from "@nestjs/common";
import { REDIS_INJECTION_TOKEN } from "../constants/redis-injection-token.const.js";

export const InjectRedis = () => Inject(REDIS_INJECTION_TOKEN);
