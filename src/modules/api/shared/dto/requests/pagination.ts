import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class PaginationRequestDto {
  @ApiProperty({ type: "integer", minimum: 0 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  page!: number;

  @ApiProperty({ type: "integer", minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit!: number;
}
