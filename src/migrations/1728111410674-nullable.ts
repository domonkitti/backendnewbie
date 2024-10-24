import { MigrationInterface, QueryRunner } from "typeorm";

export class Nullable1728111410674 implements MigrationInterface {
    name = 'Nullable1728111410674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "description" SET NOT NULL`);
    }

}
