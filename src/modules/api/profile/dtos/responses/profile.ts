import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../../../../../entities/user.js";

export class ProfileResponseDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  name: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.phone = user.phone;
    this.name = user.name;
  }
}
