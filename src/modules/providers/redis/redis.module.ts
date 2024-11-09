import { DynamicModule, Module } from "@nestjs/common";
import { Redis } from "ioredis";
import { REDIS_INJECTION_TOKEN } from "./constants/redis-injection-token.const.js";
import { REDIS_OPTIONS_INJECTION_TOKEN } from "./constants/redis-options-injection-token.const.js";
import { RedisLifecycleManagementService } from "./redis-lifecycle-management.service.js";
import { RedisModuleOptionsProvider } from "./types/redis-module-options-provider.type.js";
import { RedisModuleOptions } from "./types/redis-module-options.type.js";

@Module({
  providers: [RedisLifecycleManagementService],
})
export class RedisModule {
  static registerAsync({ imports, ...redisOptionsProvider }: RedisModuleOptionsProvider): DynamicModule {
    return {
      module: RedisModule,
      global: true,
      imports,
      providers: [
        {
          provide: REDIS_OPTIONS_INJECTION_TOKEN,
          ...redisOptionsProvider,
        },
        {
          provide: REDIS_INJECTION_TOKEN,
          inject: [REDIS_OPTIONS_INJECTION_TOKEN],
          useFactory(options: RedisModuleOptions): Redis {
            return new Redis({ ...options, lazyConnect: true });
          },
        },
      ],
      exports: [REDIS_INJECTION_TOKEN],
    };
  }
}
