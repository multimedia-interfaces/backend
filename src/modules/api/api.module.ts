import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { AuthenticationModule } from "./authentication/authentication.module.js";
import { ProfileModule } from "./profile/profile.module.js";

@Module({
  imports: [
    AuthenticationModule,
    ProfileModule,
    RouterModule.register([
      { path: "auth", module: AuthenticationModule },
      { path: "profile", module: ProfileModule },
    ]),
  ],
})
export class APIModule {}
