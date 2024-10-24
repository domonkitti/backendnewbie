import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1728102219355 implements MigrationInterface {
    name = 'Init1728102219355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bg_user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_70133044d7ea077e09886033f39" UNIQUE ("username"), CONSTRAINT "PK_5640fbf3f76a3f7dc4548b0189d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "amount" integer NOT NULL, "price" integer NOT NULL, "contactMobileNo" character varying, "status" character varying NOT NULL DEFAULT 'PENDING', CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "bg_user"`);
    }

}
