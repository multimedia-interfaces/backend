import { RideClassesEnum } from "../enums/ride-classes.enum.js";
import { RideDetailFieldsEnum } from "../enums/ride-detail-fields.enum.js";
import { RideServicesEnum } from "../enums/ride-services.enum.js";
import { RidePassengerInfo } from "./ride-passenger-info.type.js";

export type RidePassengerDetailValue = RidePassengerInfo;

export type RideRouteDetailValue = string[];

export type RideClassDetailValue = RideClassesEnum;

export type RideServicesDetailValue = RideServicesEnum[];

export type RideDetailValue<Field extends RideDetailFieldsEnum> = Field extends RideDetailFieldsEnum.PASSENGER
  ? RidePassengerDetailValue
  : Field extends RideDetailFieldsEnum.ROUTE
    ? RideRouteDetailValue
    : Field extends RideDetailFieldsEnum.CLASS
      ? RideClassDetailValue
      : Field extends RideDetailFieldsEnum.SERVICES
        ? RideServicesDetailValue
        : never;
