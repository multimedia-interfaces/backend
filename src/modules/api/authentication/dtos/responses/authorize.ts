import { ApiProperty } from "@nestjs/swagger";

export class AuthorizeResponseDTO {
  @ApiProperty()
  readonly token: string;

  constructor(token: string) {
    this.token = token;
  }
}
