import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";

type WithoutIndexSignature<T> = {
  [Key in keyof T as string extends Key
    ? never
    : number extends Key
      ? never
      : symbol extends Key
        ? never
        : Key]: T[Key];
};

type JwtPayloadWithStandardFields = WithoutIndexSignature<BaseJwtPayload>;

type UsedStandardJwtPayloadFields = "iss" | "sub" | "aud" | "exp";

type JwtPayloadPartWithUsedStandardFields = {
  [Key in Extract<UsedStandardJwtPayloadFields, keyof JwtPayloadWithStandardFields>]: Exclude<
    JwtPayloadWithStandardFields[Key],
    undefined
  >;
};

export type JwtPayload = JwtPayloadPartWithUsedStandardFields;
