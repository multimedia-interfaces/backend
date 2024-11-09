import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class LoginBodyDTO {
  @ApiProperty()
  @IsPhoneNumber()
  phone!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password!: string;
}
