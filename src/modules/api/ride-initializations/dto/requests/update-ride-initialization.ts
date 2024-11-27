import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsEnum, IsObject, IsString, ValidateNested } from "class-validator";
import { RideClassesEnum } from "../../../../../shared/enums/ride-classes.enum.js";
import { RideDetailFieldsEnum } from "../../../../../shared/enums/ride-detail-fields.enum.js";
import { RideServicesEnum } from "../../../../../shared/enums/ride-services.enum.js";
import { RideDetailValue } from "../../../../../shared/types/ride-detail-value.type.js";
import { RidePassengerInfo } from "../../../../../shared/types/ride-passenger-info.type.js";
import { Type } from "class-transformer";

export abstract class RideDetailUpdateDto<Field extends RideDetailFieldsEnum> {
  @IsEnum(RideDetailFieldsEnum)
  abstract field: Field;

  abstract value: RideDetailValue<Field>;
}

export class RidePassengerValueUpdateDto implements RidePassengerInfo {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  phone!: string;
}

export class RidePassengerDetailUpdateDto extends RideDetailUpdateDto<RideDetailFieldsEnum.PASSENGER> {
  @ApiProperty({ type: "string", enum: [RideDetailFieldsEnum.PASSENGER] })
  field!: RideDetailFieldsEnum.PASSENGER;

  @ApiProperty({ type: RidePassengerValueUpdateDto })
  @IsObject()
  @ValidateNested()
  value!: RidePassengerValueUpdateDto;
}

export class RideRouteDetailUpdateDto extends RideDetailUpdateDto<RideDetailFieldsEnum.ROUTE> {
  @ApiProperty({ type: "string", enum: [RideDetailFieldsEnum.ROUTE] })
  field!: RideDetailFieldsEnum.ROUTE;

  @ApiProperty({ isArray: true })
  @IsArray()
  @IsString({ each: true })
  value!: string[];
}

export class RideClassDetailUpdateDto extends RideDetailUpdateDto<RideDetailFieldsEnum.CLASS> {
  @ApiProperty({ type: "string", enum: [RideDetailFieldsEnum.CLASS] })
  field!: RideDetailFieldsEnum.CLASS;

  @ApiProperty({ enum: RideClassesEnum, enumName: "RideClassesEnum" })
  @IsEnum(RideClassesEnum)
  value!: RideClassesEnum;
}

export class RideServicesDetailUpdateDto extends RideDetailUpdateDto<RideDetailFieldsEnum.SERVICES> {
  @ApiProperty({ type: "string", enum: [RideDetailFieldsEnum.SERVICES] })
  field!: RideDetailFieldsEnum.SERVICES;

  @ApiProperty({ enum: RideServicesEnum, enumName: "RideServicesEnum", isArray: true })
  @IsArray()
  @IsEnum(RideServicesEnum, { each: true })
  value!: RideServicesEnum[];
}

@ApiExtraModels(
  RidePassengerDetailUpdateDto,
  RideRouteDetailUpdateDto,
  RideClassDetailUpdateDto,
  RideServicesDetailUpdateDto,
)
export class UpdateRideInitializationBodyDto {
  @Type(() => RideDetailUpdateDto, {
    discriminator: {
      property: "field",
      subTypes: [
        { name: RideDetailFieldsEnum.PASSENGER, value: RidePassengerDetailUpdateDto },
        { name: RideDetailFieldsEnum.ROUTE, value: RideRouteDetailUpdateDto },
        { name: RideDetailFieldsEnum.CLASS, value: RideClassDetailUpdateDto },
        { name: RideDetailFieldsEnum.SERVICES, value: RideServicesDetailUpdateDto },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(RidePassengerDetailUpdateDto) },
      { $ref: getSchemaPath(RideRouteDetailUpdateDto) },
      { $ref: getSchemaPath(RideClassDetailUpdateDto) },
      { $ref: getSchemaPath(RideServicesDetailUpdateDto) },
    ],
  })
  update!:
    | RidePassengerDetailUpdateDto
    | RideRouteDetailUpdateDto
    | RideClassDetailUpdateDto
    | RideServicesDetailUpdateDto;
}
