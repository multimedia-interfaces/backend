import { ApiProperty } from "@nestjs/swagger";

export abstract class PaginatedResponseDto<T> {
  abstract data: T[];

  @ApiProperty({ type: "integer" })
  total!: number;

  constructor(total: number) {
    this.total = total;
  }
}
