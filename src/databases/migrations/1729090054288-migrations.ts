import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729090054288 implements MigrationInterface {
    name = 'Migrations1729090054288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD \`status\` enum ('0', '1', '2', '3', '4') NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_84e765378a5f03ad9900df3a9ba\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_84e765378a5f03ad9900df3a9ba\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD \`status\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP COLUMN \`userId\``);
    }

}
