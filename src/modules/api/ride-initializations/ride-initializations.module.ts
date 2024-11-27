import { Module } from "@nestjs/common";
import { RideInitializationsController } from "./ride-initializations.controller.js";
import { RideInitializationsService } from "./ride-initializations.service.js";

@Module({
  providers: [RideInitializationsService],
  controllers: [RideInitializationsController],
})
export class RideInitializationsModule {}
