import { Injectable, NotFoundException } from "@nestjs/common";
import { UserEntity } from "../../../entities/user.js";
import { ProfileResponseDTO } from "./dtos/responses/profile.js";

@Injectable()
export class ProfileService {
  async get(id: string): Promise<ProfileResponseDTO> {
    const user = await UserEntity.findOne({ where: { id } });

    if (user === null) {
      throw new NotFoundException("User not found");
    }

    return new ProfileResponseDTO(user);
  }
}
