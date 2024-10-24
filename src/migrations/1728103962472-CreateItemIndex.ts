import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItemIndex1728103962472 implements MigrationInterface {

        // copy only body
        public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(`CREATE INDEX idx_item_title ON item(title);`);
        }
    
        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(`DROP INDEX idx_item_title`);
        }
        // copy only body
    
    }
