import { Module } from "@nestjs/common";

@Module({
  imports: [
    // RedisModule.registerAsync({
    //   imports: [ConfigModule.forFeature(redisConfig)],
    //   inject: [redisConfig.KEY],
    //   useFactory(config: ConfigType<typeof redisConfig>): RedisModuleOptions {
    //     return config;
    //   },
    // }),
  ],
})
export class ProvidersModule {}
