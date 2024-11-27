import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { RideDetailFieldsEnum } from "../shared/enums/ride-detail-fields.enum.js";
import { RideDetailValue } from "../shared/types/ride-detail-value.type.js";
import { RideInitializationEntity } from "./ride-initialization.js";

@Entity()
export class RideDetailEntity<Field extends RideDetailFieldsEnum> extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  initializationID!: string;

  @ManyToOne(() => RideInitializationEntity, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "initializationID" })
  initialization!: RideInitializationEntity;

  @PrimaryColumn({ type: "enum", enum: RideDetailFieldsEnum })
  field!: Field;

  @Column({ type: "jsonb" })
  value!: RideDetailValue<Field>;

  isForField<ExpectedField extends RideDetailFieldsEnum>(
    field: ExpectedField,
  ): this is RideDetailEntity<ExpectedField> {
    return (this as RideDetailEntity<RideDetailFieldsEnum>).field === field;
  }
}
