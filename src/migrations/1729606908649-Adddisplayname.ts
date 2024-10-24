import { MigrationInterface, QueryRunner } from "typeorm";

export class Adddisplayname1729606908649 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bg_user" ADD "displayname" character varying NOT NULL DEFAULT 'WaitingFornName'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bg_user" DROP COLUMN "displayname"`);
    }

}

