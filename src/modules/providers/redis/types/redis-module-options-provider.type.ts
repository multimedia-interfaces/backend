import { FactoryProvider, ModuleMetadata } from "@nestjs/common";

export type RedisModuleOptionsProvider = Pick<FactoryProvider, "useFactory" | "inject"> &
  Pick<ModuleMetadata, "imports">;
