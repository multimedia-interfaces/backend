import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRideRelatedTables1732574331092 implements MigrationInterface {
  name = "CreateRideRelatedTables1732574331092";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ride_initialization_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userID" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_83a2170c838c0e04fb0a042b813" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."ride_detail_entity_field_enum" AS ENUM('passenger', 'route', 'class', 'services')`,
    );
    await queryRunner.query(
      `CREATE TABLE "ride_detail_entity" ("initializationID" uuid NOT NULL, "field" "public"."ride_detail_entity_field_enum" NOT NULL, "value" jsonb NOT NULL, CONSTRAINT "PK_25d723ca6cde043d52745e86bdb" PRIMARY KEY ("initializationID", "field"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."RideClassesEnum" AS ENUM('econom', 'standard', 'business')`);
    await queryRunner.query(`CREATE TYPE "public"."RideServicesEnum" AS ENUM('animal', 'big-trunk', 'child-seat')`);
    await queryRunner.query(
      `CREATE TABLE "ride_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userID" uuid NOT NULL, "passenger" jsonb NOT NULL, "route" text array NOT NULL, "class" "public"."RideClassesEnum" NOT NULL, "services" "public"."RideServicesEnum" array NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "finalizedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d3e91cbadb69645e0565cb0a468" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_initialization_entity" ADD CONSTRAINT "FK_096d8e69f0740e41c2f25964d49" FOREIGN KEY ("userID") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_detail_entity" ADD CONSTRAINT "FK_5d16a6c715dcf992d032397c08a" FOREIGN KEY ("initializationID") REFERENCES "ride_initialization_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "ride_entity" ADD CONSTRAINT "FK_07371c18d75ee39b72977d577e3" FOREIGN KEY ("userID") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ride_entity" DROP CONSTRAINT "FK_07371c18d75ee39b72977d577e3"`);
    await queryRunner.query(`ALTER TABLE "ride_detail_entity" DROP CONSTRAINT "FK_5d16a6c715dcf992d032397c08a"`);
    await queryRunner.query(
      `ALTER TABLE "ride_initialization_entity" DROP CONSTRAINT "FK_096d8e69f0740e41c2f25964d49"`,
    );
    await queryRunner.query(`DROP TABLE "ride_entity"`);
    await queryRunner.query(`DROP TYPE "public"."RideServicesEnum"`);
    await queryRunner.query(`DROP TYPE "public"."RideClassesEnum"`);
    await queryRunner.query(`DROP TABLE "ride_detail_entity"`);
    await queryRunner.query(`DROP TYPE "public"."ride_detail_entity_field_enum"`);
    await queryRunner.query(`DROP TABLE "ride_initialization_entity"`);
  }
}
