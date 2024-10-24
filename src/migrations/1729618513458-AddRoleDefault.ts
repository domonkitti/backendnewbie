import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleDefault1729618513458 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE "bg_user" ALTER COLUMN "role" SET DEFAULT 'USER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bg_user" ALTER COLUMN "role" DROP DEFAULT`);
    }

}
