import { MigrationInterface, QueryRunner } from "typeorm";

export class Additemowner1729618783660 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "owner" character varying NOT NULL DEFAULT 'whothefuckallthis?'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "owner"`);
    }

}
