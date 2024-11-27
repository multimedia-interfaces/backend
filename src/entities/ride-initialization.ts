import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RideDetailFieldsEnum } from "../shared/enums/ride-detail-fields.enum.js";
import { RideDetailEntity } from "./ride-details.js";
import { UserEntity } from "./user.js";

@Entity()
export class RideInitializationEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  userID!: string;

  @ManyToOne(() => UserEntity, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "userID" })
  user!: UserEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => RideDetailEntity, (details) => details.initialization, { eager: true })
  details!: RideDetailEntity<RideDetailFieldsEnum>[];
}
