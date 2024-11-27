import { Module } from "@nestjs/common";
import { RidesController } from "./rides.controller.js";
import { RidesService } from "./rides.service.js";

@Module({
  providers: [RidesService],
  controllers: [RidesController],
})
export class RidesModule {}
