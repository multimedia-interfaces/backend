import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { LoginBodyDTO } from "./login.body.js";

export class RegistrationBodyDTO extends LoginBodyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;
}
