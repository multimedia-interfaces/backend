import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RideClassesEnum } from "../shared/enums/ride-classes.enum.js";
import { RideServicesEnum } from "../shared/enums/ride-services.enum.js";
import { RidePassengerInfo } from "../shared/types/ride-passenger-info.type.js";
import { UserEntity } from "./user.js";

@Entity()
export class RideEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  userID!: string;

  @ManyToOne(() => UserEntity, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "userID" })
  user!: UserEntity;

  @Column({ type: "jsonb" })
  passenger!: RidePassengerInfo;

  @Column({ type: "text", array: true })
  route!: string[];

  @Column({ type: "enum", enum: RideClassesEnum, enumName: "RideClassesEnum" })
  class!: RideClassesEnum;

  @Column({ type: "enum", enum: RideServicesEnum, enumName: "RideServicesEnum", array: true })
  services!: RideServicesEnum[];

  @Column({ type: "timestamp with time zone" })
  createdAt!: Date;

  @CreateDateColumn()
  readonly finalizedAt!: Date;
}
