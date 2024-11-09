import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Algorithm, SignOptions, VerifyOptions } from "jsonwebtoken";
import jwtConfig from "../../../../configs/jwt.config.js";
import { TokenService } from "./token.service.js";

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      inject: [jwtConfig.KEY],
      useFactory({ secret, expiresInSec }: ConfigType<typeof jwtConfig>) {
        const algorithm: Algorithm = "HS256",
          issuer = "course-work.backend";

        const sharedOptions: {
          [Key in keyof SignOptions & keyof VerifyOptions]?: SignOptions[Key] extends VerifyOptions[Key]
            ? SignOptions[Key]
            : never;
        } = {
          issuer,
          audience: issuer,
        };

        return {
          secret,
          signOptions: {
            ...sharedOptions,
            algorithm,
            expiresIn: expiresInSec,
          },
          verifyOptions: {
            ...sharedOptions,
            algorithms: [algorithm],
          },
        };
      },
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
