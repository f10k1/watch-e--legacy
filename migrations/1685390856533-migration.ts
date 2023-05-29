import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1685390856533 implements MigrationInterface {
    name = 'migration1685390856533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`important\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`important\``);
    }

}
