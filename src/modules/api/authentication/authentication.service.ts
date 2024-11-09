import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { compare, hash } from "bcrypt";
import { UserEntity } from "../../../entities/user.js";
import isQueryFailedError from "../../../utils/is-query-failed-error.js";
import { LoginBodyDTO } from "./dtos/requests/login.body.js";
import { RegistrationBodyDTO } from "./dtos/requests/registration.body.js";
import { AuthorizeResponseDTO } from "./dtos/responses/authorize.js";
import { TokenService } from "./token/token.service.js";

@Injectable()
export class AuthenticationService {
  constructor(private readonly tokenService: TokenService) {}

  async register({ phone, name, password }: RegistrationBodyDTO): Promise<AuthorizeResponseDTO> {
    const user = new UserEntity();
    user.phone = phone;
    user.name = name;
    user.passwordHash = await hash(password, 16);

    try {
      await user.save();
    } catch (error: unknown) {
      if (isQueryFailedError(error) && error.code === "23505") {
        throw new ConflictException("Phone number is already in use");
      }

      throw error;
    }

    return new AuthorizeResponseDTO(await this.tokenService.sign(user));
  }

  async login({ phone, password }: LoginBodyDTO): Promise<AuthorizeResponseDTO> {
    const user = await UserEntity.findOne({ where: { phone } });

    if (user === null) {
      throw new UnauthorizedException("User not found");
    }

    const isPasswordMatch = await compare(password, user.passwordHash);

    if (!isPasswordMatch) {
      throw new UnauthorizedException("Invalid password");
    }

    return new AuthorizeResponseDTO(await this.tokenService.sign(user));
  }
}
