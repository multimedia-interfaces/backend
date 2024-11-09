import { Injectable, Logger, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Redis } from "ioredis";
import { InjectRedis } from "./decorators/inject-redis.decorator.js";

@Injectable()
export class RedisLifecycleManagementService implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(this.constructor.name);

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async onModuleInit(): Promise<void> {
    this.logger.debug("Connecting to Redis");
    await this.redis.connect();
    this.logger.log("Connected to Redis");
  }

  async onApplicationShutdown(): Promise<void> {
    this.logger.debug("Disconnecting from Redis");
    await this.redis.quit();
    this.logger.log("Disconnected from Redis");
  }
}
