import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../../../../entities/user.js";
import { JwtPayload } from "../../shared/types/jwt.types.js";

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async sign(subject: UserEntity): Promise<string> {
    return await this.jwtService.signAsync({}, { subject: subject.id });
  }

  async verify(token: string): Promise<JwtPayload> {
    return await this.jwtService.verifyAsync<JwtPayload>(token);
  }
}
