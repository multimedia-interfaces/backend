import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { AuthenticationModule } from "./authentication/authentication.module.js";
import { ProfileModule } from "./profile/profile.module.js";
import { RideInitializationsModule } from "./ride-initializations/ride-initializations.module.js";
import { RidesModule } from "./rides/rides.module.js";

@Module({
  imports: [
    AuthenticationModule,
    ProfileModule,
    RideInitializationsModule,
    RidesModule,
    RouterModule.register([
      { path: "auth", module: AuthenticationModule },
      { path: "profile", module: ProfileModule },
      { path: "initializations", module: RideInitializationsModule },
      { path: "rides", module: RidesModule },
    ]),
  ],
})
export class APIModule {}
