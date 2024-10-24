import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterContactMobileNo1729310165292 implements MigrationInterface {
    name = 'AlterContactMobileNo1729310165292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" RENAME COLUMN "contactMobileNo" TO "contact_mobile_no"`);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "description" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "description" SET DEFAULT 'Waiting description'`);
        await queryRunner.query(`ALTER TABLE "item" RENAME COLUMN "contact_mobile_no" TO "contactMobileNo"`);
    }

}
