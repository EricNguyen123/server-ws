import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729044954142 implements MigrationInterface {
    name = 'Migrations1729044954142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`size_types\` DROP COLUMN \`size_type\``);
        await queryRunner.query(`ALTER TABLE \`size_types\` ADD \`size_type\` enum ('0', '1') NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`size_types\` DROP COLUMN \`size_type\``);
        await queryRunner.query(`ALTER TABLE \`size_types\` ADD \`size_type\` int NOT NULL`);
    }

}
