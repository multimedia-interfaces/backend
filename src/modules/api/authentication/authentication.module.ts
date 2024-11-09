import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller.js";
import { AuthenticationService } from "./authentication.service.js";
import { TokenModule } from "./token/token.module.js";

@Module({
  imports: [TokenModule],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
